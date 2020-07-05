module.exports = function (mongoose) {
    const History = new mongoose.Schema({
        Customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer",
        },
        OnModel: {
            type: String,
            enum: ["Exhibit", "Exhibition"],
            required: true,
        },
        Model_Id: {
            type: mongoose.Schema.Types.ObjectId,
            refPath: "OnModel",
        },
        Key: {
            type: String,
            required: true
        },
        Value: {
            type: String,
            required: true
        },
    });
    return History;
};
