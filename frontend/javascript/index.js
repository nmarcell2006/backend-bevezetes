const postFetch1 = async (url, data) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        if(!response.ok){
            throw new Error("Hiba: ", response.status)
        }
        return await response.json();
    }catch (error) {
        throw new Error("Hiba: ", error)
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    
})






const postFetch = async (url, data) => {
    try{
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        if(!response.ok){
            throw new Error("Hiba: ", response.status)
        }
        return await response.json();
    }catch (error) {
        throw new Error("Hiba: ", error)
    }
}


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('sendBtn').addEventListener('click', async () => {
        const sender = document.getElementById('senderText').value;
        const message = document.getElementById('messageText').value;

        try{
            const response = await postFetch('/api/sendmessage', {
                sender: sender,
                message: message
            })
            document.getElementById('forResponse').innerHTML = response.message;
        } catch (error) {
            console.error("Hiba a üzenet küldésekor:", error);
        }
    })
})





