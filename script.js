async function generateHashes(){

    let text =
    document.getElementById("inputText").value;

    if(!text){

        alert("Please enter text.");

        return;
    }

    const encoder =
    new TextEncoder();

    const data =
    encoder.encode(text);

    const sha1 =
    await crypto.subtle.digest("SHA-1", data);

    const sha256 =
    await crypto.subtle.digest("SHA-256", data);

    const sha512 =
    await crypto.subtle.digest("SHA-512", data);

    const results =
    document.getElementById("results");

    results.innerHTML = "";

const md5 =
CryptoJS.MD5(text).toString();

addCard(
    "MD5 🔴 Legacy",
    md5
);

addCard(
    "SHA-1 🟠 Weak",
    bufferToHex(sha1)
);

addCard(
    "SHA-256 🟡 Recommended",
    bufferToHex(sha256)
);

addCard(
    "SHA-512 🟢 Strong",
    bufferToHex(sha512)
);
}

function bufferToHex(buffer){

    return [...new Uint8Array(buffer)]
        .map(b =>
            b.toString(16)
            .padStart(2,"0")
        )
        .join("");
}

function addCard(title, hash){

    const results =
    document.getElementById("results");

    const card =
    document.createElement("div");

    card.className =
    "hash-card";

    card.innerHTML = `
        <div class="hash-title">${title}</div>

        <div class="hash-value">${hash}</div>

        <button
            class="copy-btn"
            onclick="copyHash('${hash}')">
            Copy
        </button>
    `;

    results.appendChild(card);
}

function copyHash(hash){

    navigator.clipboard.writeText(hash);

    function copyHash(hash){

    navigator.clipboard.writeText(hash);

    const oldTitle = document.title;

    document.title = "✓ Copied";

    setTimeout(() => {

        document.title = oldTitle;

    }, 1500);
}
}

document
.getElementById("inputText")
.addEventListener("keydown", function(event){

    if(event.key === "Enter" && !event.shiftKey){

        event.preventDefault();

        generateHashes();
    }

});

async function verifyHash(){

    let text =
    document.getElementById("verifyText").value;

    let hash =
    document.getElementById("verifyHash")
    .value
    .trim()
    .toLowerCase();

    if(!text || !hash){

        alert("Please enter text and hash");

        return;
    }

    let generatedMD5 =
    CryptoJS.MD5(text).toString();

    if(generatedMD5 === hash){

        document
        .getElementById("verifyResult")
        .innerHTML =
        '<span class="success">✓ MATCH</span>';

        return;
    }

    const encoder =
    new TextEncoder();

    const data =
    encoder.encode(text);

    const sha1 =
    bufferToHex(
        await crypto.subtle.digest(
            "SHA-1",
            data
        )
    );

    if(sha1 === hash){

        document
        .getElementById("verifyResult")
        .innerHTML =
        '<span class="success">✓ MATCH</span>';

        return;
    }

    const sha256 =
    bufferToHex(
        await crypto.subtle.digest(
            "SHA-256",
            data
        )
    );

    if(sha256 === hash){

        document
        .getElementById("verifyResult")
        .innerHTML =
        '<span class="success">✓ MATCH</span>';

        return;
    }

    const sha512 =
    bufferToHex(
        await crypto.subtle.digest(
            "SHA-512",
            data
        )
    );

    if(sha512 === hash){

        document
        .getElementById("verifyResult")
        .innerHTML =
        '<span class="success">✓ MATCH</span>';

        return;
    }

    document
    .getElementById("verifyResult")
    .innerHTML =
    '<span class="fail">✗ NO MATCH</span>';
}