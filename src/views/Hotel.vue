<template>
  <div id="app">
    <v-container>
      <div id="title">Add new hotel</div>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="name"
              :rules="nameRules"
              label="Name"
              required
            ></v-text-field>

            <v-text-field
              v-model="star"
              :rules="starRules"
              label="Star (in number)"
              type="number"
              required
            ></v-text-field>

            <v-textarea
              v-model="address"
              auto-grow
              :rules="addressRules"
              label="Address"
              rows="1"
            ></v-textarea>
          </v-col>

          <!-- column input photos -->
          <v-col cols="6" md="2">
            <v-file-input
              v-model="files"
              label="Foto"
              multiple
              prepend-icon="mdi-camera"
            >
              <template v-slot:selection="{ text }">
                <v-chip small label color="primary">
                  {{ text }}
                </v-chip>
              </template>
            </v-file-input>
            <v-file-input
              v-model="files"
              label="Foto"
              multiple
              prepend-icon="mdi-camera"
            >
              <template v-slot:selection="{ text }">
                <v-chip small label color="primary">
                  {{ text }}
                </v-chip>
              </template>
            </v-file-input>
            <v-file-input
              v-model="files"
              label="Foto"
              multiple
              prepend-icon="mdi-camera"
            >
              <template v-slot:selection="{ text }">
                <v-chip small label color="primary">
                  {{ text }}
                </v-chip>
              </template>
            </v-file-input>
          </v-col>

          <!-- column input by -->
          <v-col cols="6" md="2">
            <v-text-field
              v-model="fotoBy"
              label="Photo by"
              required
            ></v-text-field>
            <v-text-field
              v-model="fotoBy"
              label="Photo by"
              required
            ></v-text-field>
            <v-text-field
              v-model="fotoBy"
              label="Photo by"
              required
            ></v-text-field>
          </v-col>
        </v-row>

        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4 left"
          @click="validate"
        >
          Submit
        </v-btn>
      </v-form>
    </v-container>

    <!-- container loop result -->
    <v-container>
      <v-row>
        <v-col v-for="(hotel, i) in hotels" :key="hotel[i]" cols="6" md="2">
          <v-card class="mx-auto" max-width="344">
            <!-- <v-img
            contain
            height="100"
            :src=""> -->
            <v-card-title v-text="hotel.name"></v-card-title>
            <v-card-subtitle>
              <div class="text--primary">
                {{ hotel.address }}
              </div>
            </v-card-subtitle>
            <v-card-actions>
              <v-icon v-for="n in parseInt(hotel.star)" :key="n"
                >mdi-star</v-icon
              >
            </v-card-actions>

            <!-- </v-img> -->
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
    var task = [];
    db.ref("hotel/").on("value", function (params) {
      task.splice(0);
      params.forEach((element) => {
        var child = element.val();
        task.push(child);
      });
    });
    this.hotels = task;
  },

  data() {
    return {
      valid: true,
      name: "",
      nameRules: [(v) => !!v || "Name is required"],
      star: "",
      starRules: [(v) => !!v || "Star is required"],
      address: "",
      addressRules: [(v) => !!v || "Address is required"],
      files: [],
      hotels: [],
    };
  },

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        var hotel = db.ref("hotel/");
        hotel.push().set({
          name: this.name,
          star: this.star,
          address: this.address,
        });
         this.$refs.form.reset()
      }
    },
  },
};
</script>

<style lang="scss">
#title {
  font-size: 24px;
  font-style: bold;
}
</style>