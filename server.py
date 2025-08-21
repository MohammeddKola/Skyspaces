from flask import Flask, request, jsonify
import razorpay
import os
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

app = Flask(__name__)

# Razorpay credentials from .env
RAZORPAY_KEY_ID = os.getenv("RAZORPAY_KEY_ID")
RAZORPAY_KEY_SECRET = os.getenv("RAZORPAY_KEY_SECRET")

# Initialize Razorpay client
client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET))

@app.route("/create_order", methods=["POST"])
def create_order():
    try:
        data = request.get_json()
        amount = data.get("amount")  # amount in INR (e.g., 199 for ₹199)

        # Create order in Razorpay (amount is in paise)
        order = client.order.create({
            "amount": amount * 100,  # convert to paise
            "currency": "INR",
            "payment_capture": 1
        })

        return jsonify(order)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
