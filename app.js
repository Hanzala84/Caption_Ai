function getCaption() {
    const input = document.getElementById("input").value
    const loading = document.getElementById("loading");
    const output = document.getElementById("output")

    if(input===""){
        alert("Enter Post Topic or Description");
        return
    }
    const myHeaders = new Headers();
    myHeaders.append("x-goog-api-key", "AIzaSyBfKQ4YsUrUCmd_glz5VzJLrR31v0OTTF8");
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "contents": [
            {
                "parts": [
                    {
                        "text": `You are a professional social media caption writer. Write an engaging, SEO-friendly caption for the given product description:${input} Use a strong hook, natural keywords, and a clear CTA. Make it human and non-generic. Do not mention AI.Rules:If the platform is provided, optimize according to platform: Instagram → short, emojis allowed, 10–12 hashtags Facebook → conversational, 0–3 hashtags If no platform is given, create a general caption suitable for any social media.`
                    }
                ]
            }
        ]
    });
   
        loading.style.display = 'flex';
        output.classList.add('loading');
        output.textContent = '';
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent", requestOptions)
            .then((response) => response.json())
            .then((result) => output.textContent = result.candidates[0].content.parts[0].text)
            .then(()=>loading.style.display = 'none')
            .catch((error) => output.textContent= "Something Went Wrong Please Try Again");
            
   


}
