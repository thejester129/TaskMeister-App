import * as Clipboard from "expo-clipboard";
export default async (text: string) => {
  await Clipboard.setStringAsync(text);
};
