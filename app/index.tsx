import { useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { menu_items } from "./menu_items";

export default function MenuScreen() {
  const [expandedID, setExpandedID] = useState<string | null>(null);

  const [cartCount, setCartCount] = useState<number>(0);

  const leggTilCart = () => {
    setCartCount((prev) => prev + 1);
  };

  return (
    <ScrollView style={styles.container}>

      <View style={styles.header}>
        <Image 
          source={require("../assets/images/pizzabakeren_logo.png")}
          style={styles.Logo}>
        </Image>

        <Pressable 
          style={styles.cartLogoContainer}
          onPress={() => {
            console.log("Cart trykket")
          }}
          >

          <Image 
            source={require("../assets/images/cart.png")}
            style={styles.cartLogo}
            />
            {cartCount > 0 && (
              <View style={styles.cartCount}>
                <Text style={styles.cartCountTekst}>{cartCount}</Text>
              </View>
            )}
        </Pressable>

      </View>


    <View style={styles.grid}>
      {menu_items.map((item) => {
        const isExpanded = item.id === expandedID;

        return (
          <View key={item.id} style={styles.card}>
            <Pressable
              onPress={() => setExpandedID(isExpanded ? null : item.id)}
            >
              <Text style={styles.ItemTittel}>{item.navn}</Text>
              <Text style={styles.ItemPris}>{item.pris.toFixed(2)} kr</Text>
            </Pressable>

            {isExpanded && (
              <View style={styles.dropdown}>
                <Text style={styles.dropdownTittel}>Ingredienser:</Text>
                <Text style={styles.dropdownTekst}>{item.description}</Text>

                <Text style={[styles.dropdownTittel, { marginTop: 8 }]}>
                  Allergener:
                </Text>
                <Text style={styles.dropdownTekst}>
                  {item.allergener || "Ingen"}
                </Text>
                
                <Pressable
                  onPress={() => leggTilCart()}
                  style={styles.addButton}
                >
                  <Text style={styles.addButtonText}>Legg til i kurven</Text>
                </Pressable>
              </View>
            )}
          </View>
        );
      })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff1c1",
  },
  header: {
    height: 100,
    backgroundColor: "#761f18",
    width: "100%",
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  Logo: {
    height: 70,
    width: 150,
    resizeMode: "contain",
  },
  card: {
    backgroundColor: "#fee39f",
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    width: 150,
    margin: 8,
  },
  
  ItemTittel: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
  },
  ItemPris: {
    marginTop: 4,
    fontSize: 16,
  },
  dropdown: {
    marginTop: 12,
  },
  dropdownTittel: {
    fontWeight: "bold",
    fontSize: 16,
  },
  dropdownTekst: {
    fontSize: 14,
  },
  addButton: {
    marginTop: 12,
    backgroundColor: "green",
    padding: 10,
    borderRadius: 8,
  },
  addButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },

  cartLogo: {
    width: 35,
    height: 35,
  },

  cartCount: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "red",
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",

  },
  cartCountTekst: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
  },
  cartLogoContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});
