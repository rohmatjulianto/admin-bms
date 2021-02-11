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
  </div>
</template>
<script>
export default {
  data: () => ({
    valid: true,
    name: "",
    nameRules: [(v) => !!v || "Name is required"],
    star: "",
    starRules: [(v) => !!v || "Star is required"],
    address: "",
    addressRules: [(v) => !!v || "Address is required"],
    files: [],
  }),

  methods: {
    validate() {
      this.$refs.form.validate();
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