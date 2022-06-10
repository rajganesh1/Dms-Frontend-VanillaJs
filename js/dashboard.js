class dashboard {
    constructor() {
        this.getFilesAndFolderList();
    }

    async getFilesAndFolderList() {
        const id = this.getUserId();
        const token = this.getAccessToken();
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`)
        const url = `http://localhost:6002/v1/home/${id}`;
        var requestOptions = {
            method: 'GET',
            headers:{
                "accept": "*/*",
                'Content-Type': 'text/plain',
                'Authorization': 'Bearer ' + token
            },
            redirect: 'follow'
          };
        const responce = await fetch(url, requestOptions);
        const data = await responce.json();
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
                document.getElementById("folder-table").appendChild(tr); 
            } else {
                let tdName = document.createElement("td");
                tdName.innerHTML = val.name;
                let tdCreatedAt = document.createElement("td");
                tdCreatedAt.innerHTML = val.createdAt;
                let tdContent = document.createElement("td");
                tdContent.innerHTML = val.content;
                let tdId = document.createElement("td");
                tdId.innerHTML = val.id;
                let tr = document.createElement("tr");
                tr.appendChild(tdName);
                tr.appendChild(tdCreatedAt);
                tr.appendChild(tdContent);
                tr.appendChild(tdId);
                document.getElementById("file-table").appendChild(tr); 
            }
        })
    }

    getUserId() {
        return localStorage.getItem('id');
    }

    getAccessToken() {
        return localStorage.getItem('accessToken');
    }
}

const instance=new dashboard();
