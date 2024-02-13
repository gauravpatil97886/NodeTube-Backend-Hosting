import mongoose ,{Schema} from "mongoose";


const SubscriptionSchema = new Schema({ 
  subscriber: {
    type: Schema.Types.ObjectId, // The user who is subscribing
    ref: "User"
  },
  channel: {
    type: Schema.Types.ObjectId, // The user to whom the subscriber is subscribing
    ref: "User"
  }
}, { timestamps: true });

const Subscription = mongoose.model("Subscription", SubscriptionSchema);

export default Subscription;
