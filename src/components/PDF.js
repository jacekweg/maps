import React from "react";
import { Page, Text, Document, StyleSheet, Font } from "@react-pdf/renderer";

Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 30,
    paddingBottom: 30,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 35,
  },
  text: {
    margin: 10,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Roboto",
  },
});

export default function PDF({
  fullPrice,
  price,
  distance,
  time,
  startAddress,
  endAddress,
}) {
  return (
    <Document language={"PL"}>
      <Page style={styles.body}>
        <Text style={styles.title}>Travel information</Text>
        <Text style={styles.text}>Price per liter: {price} PLN</Text>
        <Text style={styles.text}>Total price: {fullPrice} PLN</Text>
        <Text style={styles.text}>Distance: {distance} km</Text>
        <Text style={styles.text}>
          Time: {time.days} days, {time.hours} hours, {time.minutes} minutes
        </Text>
        <Text style={styles.text}>Start: {startAddress}</Text>
        <Text style={styles.text}>Finish: {endAddress}</Text>
      </Page>
    </Document>
  );
}
