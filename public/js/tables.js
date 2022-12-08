const tab =  async function(){

    // const response = await axios.get("/inventory/all",{'Content-Type': 'text/javascript'})
    const response = await axios.get("http://localhost:8000/inventory/all",{"Content-Type":"text/javascript"})
     const data = response.data
    
    
    
    const dataSet= [];
     data.forEach(post => {
    
      const arrPost = Object.values(post)
      
    
    
    dataSet.push(arrPost)
     });
    
    //  console.log(dataSet)
    $(document).ready(function () {
      $('#myTable').DataTable({
          data: dataSet,
          columns: [
              { title: 'Item Code' },
              { title: 'Item Name' },
              { title: 'Quantity in store' },
            
             
             
             
          ], 
          "pageLength": 5,
  
          "lengthMenu": [5,10, 25, 50, 75, 100 ],
  
          dom: 'Blfrtip',
          buttons: [
              'copy', 'csv', 'excel', 'pdf', 'print'
          ]
      });
    });
    }
    
    tab()
  