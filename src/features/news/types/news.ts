import { Timestamp } from "firebase/firestore";

export interface NewsData {
  title: string;
  image: string;
  publishedAt: Timestamp;
  authorId: string;
}