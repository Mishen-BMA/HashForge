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

    addCard(
        "MD5",
        "Browser does not natively support MD5"
    );

    addCard(
        "SHA-1",
        bufferToHex(sha1)
    );

    addCard(
        "SHA-256",
        bufferToHex(sha256)
    );

    addCard(
        "SHA-512",
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

    alert("Hash copied.");
}