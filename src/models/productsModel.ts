import { Document, ObjectId, Schema, model, Model } from "mongoose";

type Color =
  | "Preto"
  | "Bege"
  | "Marrom"
  | "Cinza"
  | "Branco"
  | "Verde"
  | "Laranja"
  | "Azul"
  | "Amarelo";

type Review = {
  user: { id: ObjectId; photo: string };
  rating: number;
  date: Date;
  comment: string;
};

export interface IProduct extends Document {
  name: string;
  category: "Bolsas e Mochilas" | "Decoração" | "Essenciais" | "Interior";
  price: string;
  description: string;
  images: string[];
  hero?: {
    image: string;
    title: string;
  };
  colors: Color[];
  ratingsAverage: number;
  reviews: Review[];
}

const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: [true, "O produto precisa ter um nome"],
    minlength: [5, "O nome do produto não pode ter menos de 5 caracteres"],
    maxLength: [50, "O nome do produto não pode ter mais de 50 caracteres"],
    trim: true,
    unique: true,
  },
  category: {
    type: String,
    required: [true, "É preciso ter uma categoria"],
  },
  price: {
    type: String,
    required: [true, "É preciso ter um preço"],
  },
  description: {
    type: String,
    required: [true, "É preciso ter uma descrição"],
  },
  images: {
    type: [String],
    required: [true, "É preciso ter um array de fotos"],
  },
  hero: {
    image: String,
    title: String,
  },
  colors: {
    type: [String],
    required: [true, "É preciso ter um array de cores"],
  },
  ratingsAverage: {
    type: Number,
    required: [true, "É preciso ter um array de cores"],
    default: 4,
    min: [1, "A média de notas precisa ser maior que 1"],
    max: [5, "A média de notas precisa ser menor que 5"],
    set: (val: number) => Math.floor(val),
  },
  reviews: [
    {
      user: {
        id: { type: Schema.Types.ObjectId, required: true },
        photo: { type: String, required: true },
      },
      rating: { type: Number, required: true },
      date: { type: Date, required: true, default: Date.now() },
      comment: { type: String, required: true },
    },
  ],
});

const Product = model<IProduct, Model<IProduct>>("Product", productSchema);

export default Product;
