# rapSong-test-local.py
from mira_sdk import MiraClient, Flow
from dotenv import load_dotenv
import os
import sys

# Load environment variables from .env file
load_dotenv()

# Get topic and style from command-line arguments
topic = sys.argv[1]
style = sys.argv[2]

api_key = os.getenv("API_KEY")

# Initialize the client
client = MiraClient(config={"API_KEY": api_key})

flow = Flow(source="flow.yaml")

# Use the dynamic input from the frontend
input_dict = {"topic": topic, "style": style}

# Run the flow and get the response
response = client.flow.test(flow, input_dict)

# Print the response (this will be captured by the Node.js server)
print(response)