// Web worker script

// Receive and decrypt messages from the main thread
onmessage = async (event) => {
    const { encryptedMessage, iv } = event.data;
    const key = await crypto.subtle.generateKey(
        { name: 'AES-GCM', length: 256 },
        true,
        ['encrypt', 'decrypt']
    );

    const decryptedMessage = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv },
        key,
        encryptedMessage
    );

    const decodedMessage = new TextDecoder().decode(decryptedMessage);
    console.log('Decrypted Message in Worker:', decodedMessage);

    // Example: Encrypt and send a response to the main thread
    const responseMessage = 'Hello from the web worker!';
    const responseEncodedMessage = new TextEncoder().encode(responseMessage);
    const responseIv = crypto.getRandomValues(new Uint8Array(12));

    const responseEncryptedMessage = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv: responseIv },
        key,
        responseEncodedMessage
    );

    postMessage({
        encryptedMessage: responseEncryptedMessage,
        iv: responseIv,
    }, [responseEncryptedMessage]);
};
