<template>
  <div class="home">
    <v-container>
      <v-row>
        <v-col cols="6">
          <v-card height="100">
            <v-card-subtitle>Accomodation Hotel</v-card-subtitle>
            <v-card-title v-text="sumHotel"></v-card-title>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card height="100">
            <v-card-subtitle>Tourism Destination</v-card-subtitle>
            <v-card-title v-text="sumDest"></v-card-title>
          </v-card>
        </v-col>

        <v-col cols="6">
          <v-card height="100">
            <v-card-subtitle>Tourism Village</v-card-subtitle>
            <v-card-title v-text="sumVill"></v-card-title>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card height="100">
            <v-card-subtitle>Art</v-card-subtitle>
            <v-card-title v-text="sumArt"></v-card-title>
          </v-card>
        </v-col>

        <v-col cols="6">
          <v-card height="100">
            <v-card-subtitle>Culture</v-card-subtitle>
            <v-card-title v-text="sumCul"></v-card-title>
          </v-card>
        </v-col>

        <v-col cols="6">
          <v-card height="100">
            <v-card-subtitle>Culinary</v-card-subtitle>
            <v-card-title v-text="sumCulin"></v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { db } from "../firebaseConfig";
export default {
  created() {
    var hotelss = 0;
    db.ref("hotel/").on("value", function (params) {
      params.forEach(() => {
        hotelss += 1;
      });
    });
    this.sumHotel = hotelss;

    var dest = 0;
    db.ref("destination/").on("value", function (params) {
      params.forEach(() => {
        dest += 1;
      });
    });
    this.sumDest = dest;

    var vill = 0;
    db.ref("village/").on("value", function (params) {
      params.forEach(() => {
        vill += 1;
      });
    });
    this.sumVill = vill;

    var arrt = 0;
    db.ref("art/").on("value", function (params) {
      params.forEach(() => {
        arrt += 1;
      });
    });
    this.sumArt = arrt;

    var cull = 0;
    db.ref("culture/").on("value", function (params) {
      params.forEach(() => {
        cull += 1;
      });
    });
    this.sumCul = cull;

    var culin = 0;
    db.ref("culinary/").on("value", function (params) {
      params.forEach(() => {
        culin += 1;
      });
    });
    this.sumCulin = culin;
  },

  data() {
    return {
      files: null,
      sumHotel: "",
      sumDest: "",
      sumVill: "",
      sumArt: "",
      sumCul: "",
      sumCulin:""
    };
  },
};
</script>
