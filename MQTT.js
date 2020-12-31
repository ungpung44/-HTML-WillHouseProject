function startConnect()
{
    clientID = "clientID-" + parseInt(Math.random() * 100);
    host = "127.0.0.1";
    port = "8080";
    console.log("Connecting IP: " + host + " PORT: " + port + " ClientID: " + clientID);
    client = new Paho.MQTT.Client(host, Number(port), clientID);
    client.onConnectionLost = onConnectionLost;
    client.connect({onSuccess: onConnect});
}

function onConnect()
{
    topic = "#";
    console.log("Subscribe to: " + topic);
    client.subscribe(topic);
    client.onMessageArrived = onMessageArrived;
}

function onConnectionLost(responseObject)
{
    console.log("Error: " + responseObject);
}

function onMessageArrived(message)
{
    console.log("Message Arrived: " + message);
}

function publish(message)
{
    
    console.log("Message sent: " + message);
    message = new Paho.MQTT.Message(message);
    message.destinationName = topic;
    message.qos = 2;
    client.send(sendingMessage);
}

function startDisconnect()
{
    client.disconnect();
    console.log("Disconnected...");
}