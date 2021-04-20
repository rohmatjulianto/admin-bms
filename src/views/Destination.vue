<template>
  <div id="app">
    <v-container>
      <v-progress-linear
        color="deep-purple accent-4"
        indeterminate
        rounded
        :active="pbar"
        height="3"
      ></v-progress-linear>

      <div id="title">Add new Tourism Destination</div>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field
              v-model="name"
              :rules="[(v) => !!v || 'Name is required']"
              label="Name "
              required
            ></v-text-field>

            <v-text-field
              v-model="maps"
              :rules="[(v) => !!v || 'Maps url is required']"
              label="Maps (short url)"
              required
            ></v-text-field>

            <v-textarea
              v-model="desc"
              auto-grow
              :rules="[(v) => !!v || 'Description is required']"
              label="Description"
              rows="1"
            ></v-textarea>
          </v-col>

          <!-- column input photos -->
          <v-col cols="12" md="3" v-for="(Image, i) in Images" :key="i">
            <v-card elevation="8">
              <v-img aspect-ratio="2" :src="Image.url">
                <v-card-title class="align-end justify-end">
                  <v-btn
                    class="mx-2"
                    fab
                    small
                    dark
                    color="pink"
                    v-if="i != Images.length - 1 || i > 0"
                    @click="removeField(i)"
                  >
                    <v-icon dark> mdi-delete </v-icon>
                  </v-btn>
                  <v-btn
                    class="mx-2"
                    fab
                    small
                    dark
                    color="indigo"
                    v-if="i == Images.length - 1"
                    @click="addField"
                  >
                    <v-icon dark> mdi-plus </v-icon>
                  </v-btn>
                </v-card-title>
              </v-img>

              <v-card-actions>
                <v-row class="justify-space-between">
                  <v-col cols="6" md="6">
                    <v-file-input
                      v-model="Images[i].name"
                      label="Foto"
                      accept="image/*"
                      prepend-icon="mdi-camera"
                      @change="onFilePicked(i)"
                      @click:clear="onClear(i)"
                      truncate-length="8"
                    >
                      <template v-slot:selection="{ text }">
                        <v-chip small label color="primary">
                          {{ text }}
                        </v-chip>
                      </template>
                    </v-file-input>
                  </v-col>
                  <v-col cols="6" md="6">
                    <v-text-field
                      v-model="Images[i].by"
                      label="Photo by"
                      :rules="[(v) => !!v || 'Photo by is required']"
                      width="10"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <v-btn
          :disabled="!valid"
          color="success"
          class="mt-8"
          @click="validate"
        >
          Submit
        </v-btn>
      </v-form>
    </v-container>

    <!-- container loop result -->
    <v-container>
      <v-row>
        <v-col v-for="(rs, i) in result" :key="rs[i]" cols="6" md="2">
          <v-card class="mx-auto" max-width="344">
            <v-img v-if="rs.images != null" :src="rs.images[0].url"> </v-img>
            <v-card-title v-text="rs.name" />
            <v-card-subtitle>
              <div class="text--primary">
                {{ rs.desc }}
              </div>
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { db, storage } from "../firebaseConfig";
var firebasePath = "destination/";
export default {
  created() {
    var task = [];
    db.ref(firebasePath).on("value", function (params) {
      task.splice(0);
      params.forEach((element) => {
        var child = element.val();
        task.push(child);
      });
    });
    this.result = task;
  },

  data() {
    return {
      pbar: false,
      valid: true,
      name: "",
      maps: "",
      desc: "",
      files: null,
      result: [],
      Images: [
        {
          name: null,
          by: null,
          url: null,
        },
      ],
    };
  },
  methods: {
    onFilePicked(i) {
      if (window.FileReader) {
        const files = this.Images[i].name;
        const fr = new FileReader();
        fr.readAsDataURL(files);
        fr.addEventListener("load", () => {
          this.Images[i].url = fr.result;
        });
      }
    },

    onClear(i) {
      this.Images[i].url = null;
    },

    validate() {
      this.valid = false;
      this.pbar = true;
      if (this.$refs.form.validate()) {
        this.pbar = true;

        var myRef = db.ref();
        var key = myRef.push().key;

        myRef.child(firebasePath + key).set({
          name: this.name,
          maps: this.maps,
          desc: this.desc,
        });

        for (let i = 0; i < this.Images.length; i++) {
          this.uploadBy(myRef, key, i);
          this.uploadImage(myRef, key, i);
        }
      } else {
        this.pbar = false;
      }
    },

    uploadBy(myRef, key, i) {
      myRef
        .child(firebasePath + "/" + key + "/images/" + i)
        .update({ by: this.Images[i].by });
    },

    uploadImage(myRef, key, i) {
      const files = this.Images[i].name;
      const path = key + "/" + files.name;
      storage
        .ref(path)
        .put(files)
        .then((snapshot) => {
          if (snapshot.state == "success") {
            storage
              .ref(path)
              .getDownloadURL()
              .then((url) => {
                myRef
                  .child(firebasePath + "/" + key + "/images/" + i)
                  .update({
                    url: url,
                  })
                  .then(() => {
                    if (i == this.Images.length - 1) {
                      this.reset();
                    }
                  });
              });
          }
        });
    },

    addField() {
      this.Images.push({ name: null, by: null, url: null });
    },

    removeField(i) {
      this.Images.splice(i, 1);
    },
    reset() {
      this.pbar = false;
      this.Images = [{ name: null, by: null, url: null }];
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
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