import { useState,useEffect } from "react";
import axios from "axios";
import { stat } from "fs";
import Link from "next/link";

 
 const koneksiSkincare = axios.create({
  
  baseURL: "http://127.0.0.1:5000/api/skincare" 
});

export default function FormSkincare() {
    const [skincare, setSkincare] =  useState(null);
    const [statekode_produk, setKode_produk] = useState("");
    const [statenama_produk, setNama_produk] = useState("");
    const [statestok, setStok] = useState("");
    const [statekedaluwarsa, setKedaluwarsa] = useState("");
    const [statefoto, setFoto] = useState("");
    const [stateadd,setAdd]=useState("hide");
    const [statebutonadd,setbtnAdd]=useState("show");
    const [stateedit,setEdit]=useState("hide");
   

    function formatDate(date) {
      var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
 
      if (month.length < 2)
          month = '0' + month;
      if (day.length < 2)
          day = '0' + day;
 
      return [year, month, day].join('-');
  }

    function formatDate(date) {
      var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
 
      if (month.length < 2)
          month = '0' + month;
      if (day.length < 2)
          day = '0' + day;
 
      return [year, month, day].join('-');
  }



    const handleSubmitAdd =  (event) => {

    event.preventDefault();
    const formData = new FormData(event.target);
    koneksiSkincare
      .post("/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
     
 }
 const handleSubmitEdit =  (event) => {
    
  event.preventDefault();
  const address = "/"+event.target.kode_produk.value;
  alert(address);
  //const formData = new FormData(event.target);
  const formData = {
    kode_produk: event.target.kode_produk.value,
    nama_produk: event.target.nama_produk.value,
    stok: event.target.stok.value,
    kedaluwarsa: event.target.kedaluwarsa.value
}
  alert(formData);
  koneksiSkincare
    .put( address,formData)
    .then((res) => {
      console.log(res);
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
   
}
  const handleAdd = (event) => {
    
     setAdd("show");
     setbtnAdd("hide");
     setEdit("hide");
 
      
  }
  const handleCancelAdd = (event) => {
    
     setAdd("hide");
     setbtnAdd("show");
     setEdit("hide");
 
      
  }
  const handleCancelEdit = (event) => {
    
    setAdd("hide");
    setbtnAdd("show");
    setEdit("hide");
    setKode_produk("");
    setNama_produk("");
    setStok("");
    setKedaluwarsa("");
    setFoto("");
     
 }
   const handleDelete = (event) => {
            event.preventDefault();
            var kode_produk = event.target.value;
            koneksiSkincare.delete(`/${kode_produk}`)
              .then(response => {
                console.log('Data berhasil dihapus:', response.data);
                setSkincare(
                  skincare.filter((skincare) => {
                     return skincare.kode_produk !== kode_produk;
                  }))
             
                // Lakukan langkah-langkah lain setelah penghapusan data
              })
              .catch(error => {
                console.error('Gagal menghapus data:', error);
              })
          }

      const handleEdit = (event) => {
            event.preventDefault();
            var kode_produk = event.target.value;
            
               const mhsEdit =  skincare.filter((skincare) => {
                     return skincare.kode_produk == kode_produk;
                  });
                  if(mhsEdit!=null){

                    setKode_produk(mhsEdit[0].kode_produk);
                    setNama_produk(mhsEdit[0].nama_produk);
                    setStok(mhsEdit[0].stok);
                    setKedaluwarsa(formatDate(mhsEdit[0].kedaluwarsa));
                    setFoto(mhsEdit[0].foto);
                    setAdd("hide");
                    setbtnAdd("hide");
                    setEdit("show");

                  }
          }
  useEffect(() => {
      async function getMahasiswa() {
        const response = await koneksiSkincare.get("/").then(function (axiosResponse) {
            setSkincare(axiosResponse.data.data); 
     
         })
         .catch(function (error) {   
          alert('error from skincare in api skincare: '+error);
         });;
          }
      getMahasiswa();
    }, []);
  
   
if(skincare==null){
return(
  <div>
    waiting...
  </div>
)
}else{

  return (
    <div>
      <center>
     <button id="btnadd" onClick={handleAdd} className={statebutonadd}
      style={{backgroundColor: "yellowgreen",
      color:"white",
      borderWidth:"1px",
      padding:"20px",
      fontSize:"18px",
      borderRadius:"5px",
      cursor: "pointer"
      }}>Post</button>

       <form id="formadd" className={stateadd} onSubmit={handleSubmitAdd} >
        <h1>POST DATA</h1> 
        <table border={0}>
            <tbody>
            <tr>
            <td> <label> Kode Produk:</label></td>
            <td><input type="text" id="kode_produk" name="kode_produk"/>
              
              </td>
        </tr>
        <tr>
            <td>  <label> Nama Produk:</label></td>
            <td><input type="text" id="nama_produk"   name="nama_produk" 
               /></td>
        </tr>
        <tr>
            <td>  <label> Stok:</label></td>
            <td><input type="text" id="stok"   name="stok" 
               /></td>
        </tr>
        <tr>
            <td>  <label> Kedaluwarsa:</label></td>
            <td>  <input type="text" name="kedaluwarsa"/></td>
        </tr>
        <tr>
            <td>  <label> Foto:</label></td>
            <td>   <input
                    type="file" name="image"/>  </td> 
        </tr>
            </tbody>
            
          </table>
          
          <input type="submit" 
          style={{padding: "5px",
          color:"white",
          backgroundColor:"blue",
          cursor: "pointer"
        }}
          />

          <input type="button" value="Cancel" onClick={handleCancelAdd} 
           style={{padding: "5px",
           color:"white",
           backgroundColor:"red",
           cursor: "pointer"
         }}
          />
          </form> 
  
      <form id="formedit" className={stateedit} onSubmit={handleSubmitEdit}>

        <h1>EDIT DATA</h1>

          <table border={0}>
            <tbody>
            <tr>
            <td> <label> Kode Produk:</label></td>
            <td><input type="text" id="kode_produk"  value={statekode_produk} name="kode_produk"/>
              {/* onChange={handleOnchangeNim}  /> */}
              </td>
        </tr>
        <tr>
            <td>  <label> Nama Produk:</label></td>
            <td><input type="text" id="nama_produk"  value={statenama_produk} name="nama_produk"
               onChange={(e) => setNama_produk(e.target.value)}
               /></td>
        </tr>
        <tr>
            <td>  <label> Stok:</label></td>
            <td><input type="text" id="stok"  value={statestok} name="stok"
               onChange={(e) => setStok(e.target.value)}
               /></td>
        </tr>
        <tr>
            <td>  <label> Kedaluwarsa:</label></td>
            <td>  <input type="text" value={statekedaluwarsa} name="kedaluwarsa"  onChange={(e) => setKedaluwarsa(e.target.value)}
           /></td>
        </tr>
        <tr>
            <td>  <label> Foto:</label></td>
            <td>  <img src={statefoto} width="80"/> </td>
        </tr>
            </tbody>
          </table>
          <input type="submit" 
           style={{padding: "5px",
           color:"white",
           backgroundColor:"blue",
           cursor: "pointer"
         }}
          />

          <input type="button" value="Cancel" onClick={handleCancelEdit} 
           style={{padding: "5px",
           color:"white",
           backgroundColor:"red",
           cursor: "pointer"
         }}
          />
          </form>  
        <br/>
        <br/>
       
    <b style={{backgroundColor:"#E7F3B6", fontSize:"50px", fontFamily:"monospace" }}>
      TABLE STOK BARANG</b><br /><br />
    
    
        <table className='dekorasi-table'>
            <thead>
                <tr>
                <td><b>Kode Produk</b></td> 
                <td><b>Nama Produk</b></td>
                <td><b>Stok</b></td>
                <td><b>Kedaluwarsa</b></td>
                <td><b>Foto</b></td>
                <td colSpan={2}><b>Action</b></td>
                </tr>
            </thead>
            <tbody>
            {skincare.map((mhs) => 
                <tr>
                    <td>{mhs.kode_produk}</td>
                    <td>{mhs.nama_produk}</td>
                    <td>{mhs.stok}</td>
                    <td>{mhs.kedaluwarsa}</td>
                    <td><img src={mhs.foto} width="120"/></td>
                   <td><button onClick={handleEdit} value={mhs.kode_produk} 
                   style={{backgroundColor: "blue",
                   color:"white",
                   borderWidth:"1px",
                   padding:"5px",
                   borderRadius:"5px",
                   cursor: "pointer"
                   }}>Edit</button></td>

                   <td><button onClick={handleDelete} value={mhs.kode_produk}
                    style={{backgroundColor: "red",
                    color:"white",
                    borderWidth:"1px",
                    padding:"5px",
                    borderRadius:"5px",
                    cursor: "pointer"
                    }}>Delete</button></td>
                </tr>
           )}     
                   </tbody>
          </table>
          </center>

          </div>
        )
}
  
  }