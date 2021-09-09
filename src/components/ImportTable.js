import React,{ useState } from 'react'
import MaterialTable from 'material-table'
import XLSX from 'xlsx'
import { height } from '@material-ui/system'

const EXTENSION = ['xlsx' , 'xls', 'csv']
export const ImportTable = () => {
    const [colDefs, setColDefs] = useState()
    const [data, setData] = useState()
    const getExtension = (file) => {
       const parts = file.name.split('.')
       const extension = parts[parts.length-1]
       return EXTENSION.includes(extension)
    }

    const convertToJson = (header, data) => {
        const rows=[]

        data.forEach(row =>{
            let rowData={}
            row.forEach((element , index)=> {
                rowData[header[index]]=element
            })
            rows.push(rowData)
        });
        return(rows)
    }
    const importExcel  = (e) => {
        const file = (e.target.files[0])

        const reader =new FileReader()
        reader.onload=(event) => {//parse data
        const bstr = event.target.result
        const workBook = XLSX.read(bstr, { type: "binary" })

      //get first sheet
      const workSheetName = workBook.SheetNames[0]
      const workSheet = workBook.Sheets[workSheetName]
      //convert to array
      const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 })
        const header = fileData[0]
        const heads = header.map(head => ({
            title: head,
            field: head
        }))
        setColDefs(heads)
        //removing headers
        
        fileData.splice(0,1)
        setData(convertToJson(header, fileData))
        }
        if(file){
            if(getExtension(file)){
                reader.readAsBinaryString(file)
            }
            else{
                alert("Invalid Format... Restart with CSV,XLSX")
            }
        }
        else{
            setData([])
            setColDefs([])
        }
    }      
    const resetData = (e) => {
        setData([])
        setColDefs([]) 
    }
    
    return (
     <div class="h-100 row align-items-center">
     <div class="col" style={{ marginTop : '50px'}}>
     <input type="file"  onChange={importExcel} />
            <input type="button" onClick={resetData} value="Reset"/>
            <div class="col" style={{ marginTop : '50px'}}></div>
            <MaterialTable 
            title={"Table"}
            data={data}    
            columns={colDefs}
            />
     </div>
   </div>
     
    )
}
