class dashboard {
    constructor() {
        this.getFilesAndFolderList();
    }

    async getFilesAndFolderList() {
        this.clearList();
        const id = this.getUserId();
        const token = this.getAccessToken();
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`)
        const url = `http://localhost:6002/v1/home/${id}`;
        let requestOptions = {
            method: 'GET',
            headers:{
                "accept": "*/*",
                'Content-Type': 'text/plain',
                'Authorization': 'Bearer ' + token
            },
            redirect: 'follow'
          };
        const response = await fetch(url, requestOptions);
        const data = await response.json();
        // let filesHtml = '';
        let foldersHtml = '';
        data.forEach((val) => {
            if(val.folder_id == undefined) {
                let tdName = document.createElement("td");
                tdName.innerHTML = val.name;
                let tdCreatedAt = document.createElement("td");
                tdCreatedAt.innerHTML = val.createdAt;
                let tdId = document.createElement("td");
                tdId.innerHTML = val.id;
                let tr = document.createElement("tr");
                tr.appendChild(tdName);
                tr.appendChild(tdCreatedAt);
                tr.appendChild(tdId);
                document.getElementById("folder-table-body").appendChild(tr); 
            } else {
                let tdName = document.createElement("td");
                tdName.innerHTML = val.name;
                let tdCreatedAt = document.createElement("td");
                tdCreatedAt.innerHTML = val.createdAt;
                let tdContent = document.createElement("td");
                tdContent.innerHTML = val.content;
                let tdId = document.createElement("td");
                tdId.innerHTML = val.folder_id;
                let tdFileid = document.createElement("td");
                tdFileid.innerHTML = val.id;
                let tr = document.createElement("tr");
                tr.appendChild(tdName);
                tr.appendChild(tdCreatedAt);
                tr.appendChild(tdContent);
                tr.appendChild(tdId);
                tr.appendChild(tdFileid);
                document.getElementById("file-table-body").appendChild(tr); 
            }
        })
    }

    clearList() {
        document.getElementById("file-table-body").innerHTML = '';
        document.getElementById("folder-table-body").innerHTML = '';
        document.getElementById("file-status").innerHTML = '';
    }

    async fileSubmit(event) {
        try {
            const filename = event.target[0].value;
            const fileExt = filename.split('.')[1];
            const folderId = event.target[1].value;
            const fileContent = event.target[2].value;
            const url = `http://localhost:6002/v1/file/`;
            let body = JSON.stringify({
                "id": Math.floor(1000 + Math.random() * 9000) + '',
                "name": filename,
                "folder_id": folderId,
                "owner_id": localStorage.getItem('id'),
                "extension": fileExt,
                "content": fileContent,
                "createdAt": new Date().toLocaleDateString()
              });
    
            let requestOptions = {
                method: 'POST',
                headers:{
                    "accept": "*/*",
                    'Content-Type': "application/json",
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                },
                redirect: 'follow',
                body: body
              };
    
            const response = await fetch(url, requestOptions);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const result = await response.text();
            document.getElementById("file-status").innerHTML = result;
        } catch (err) {
            document.getElementById("file-status").innerHTML = err;
            console.log(err)
        }
    }

    async folderSubmit(event){
        try{
            const foldername=event.target[0].value;
            const url = `http://localhost:6002/v1/folder/`;
            let body=JSON.stringify({
                "id": Math.floor(1000 + Math.random() * 9000) + '',
                "name" : foldername,
                "owner_id" : localStorage.getItem('id'),
                "createdAt" : new Date().toLocaleDateString()
            });

            let requestOptions = {
                method: 'POST',
                headers:{
                    "accept": "*/*",
                    'Content-Type': "application/json",
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                },
                redirect: 'follow',
                body: body
            };

            const response = await fetch(url, requestOptions);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const result = await response.text();
            document.getElementById("folder-status").innerHTML = result;
        } catch (err){
            document.getElementById("folder-status").innerHTML = err;
            console.log(err);
        }
    }


    getUserId() {
        return localStorage.getItem('id');
    }

    getAccessToken() {
        return localStorage.getItem('accessToken');
    }
}

const instance=new dashboard();

const form = document.getElementById('fileForm');
form.addEventListener('submit', instance.fileSubmit);

document.getElementById("file-refresh-button").addEventListener("click",(e)=>{
    instance.getFilesAndFolderList();
});

const form1 = document.getElementById('folderForm');
form1.addEventListener('submit',instance.folderSubmit);

document.getElementById("folder-refresh-button").addEventListener("click",(e)=>{
    instance.getFilesAndFolderList();
});

