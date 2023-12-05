import websocket
import json

def on_message(ws, message):
    print(f"Received message: {message}")

def on_error(ws, error):
    print(f"Error: {error}")

def on_close(ws, close_status_code, close_msg):
    print(f"Closed with status code {close_status_code}: {close_msg}")

def on_open(ws):
    # Define a message to be sent to the server
    message_data = {
        "type": "websocket.receive",
        "text": "Hello from Python WebSocket Client"
    }

    # Send the message as JSON
    ws.send(json.dumps(message_data))

if __name__ == "__main__":
    # Replace the URL with your WebSocket server URL
    websocket_url = "ws://127.0.0.1:8000/ws"

    # Create a WebSocket instance
    ws = websocket.WebSocketApp(websocket_url,
                                on_message=on_message,
                                on_error=on_error,
                                on_close=on_close)

    # Set the on_open callback to send a message when the connection is established
    ws.on_open = on_open
    
    # Run the WebSocket connection
    ws.run_forever()
