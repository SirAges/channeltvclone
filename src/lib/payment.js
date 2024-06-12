import PaystackPop from "@paystack/inline-js";
export const payWithPaystack = async ({ totalAmount, email }) => {
    const paystack = new PaystackPop();
    paystack.newTransaction({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
        email,
        amount: totalAmount, // the amount value is multiplied by 100 to convert to the lowest currency unit
        currency: "NGN", // Use GHS for Ghana Cedis or USD for US Dollars

        // ref: "YOUR_REFERENCE1",

        onSuccess: transaction => {
            // Payment complete! Reference: transaction.reference

            const reference = transaction.reference;
            const saveDb = async () => {
                const prod = {
                    userId: id,
                    paymentRef: reference,
                    totalAmount,
                    shippingAddress: {
                        street: "null",
                        city: "null",
                        state: "null",
                        zip: "null"
                    },
                    products: [
                        {
                            productId: product._id,
                            quantity: totalAmount / product.price,
                            price: product.price
                        }
                    ]
                };
                try {
                    const res = await useAxios.post("/orders", prod);

                    if (res.status === 200) {
                        router.replace("/confetti");
                    }
                } catch (error) {
                    console.log("error", error);
                }
            };
            saveDb();
        },
        onCancel: () => {
            // user closed popup
            alert("Transaction was not completed, window closed.");
        }
    });
};
