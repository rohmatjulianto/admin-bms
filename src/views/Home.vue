<template>
  <div class="home">

        <v-container>
        <v-row>
          <v-col
            v-for="n in 5"
            :key="n"
            cols="4"
          >
            <v-card height="200" dark></v-card>
          </v-col>
        </v-row>
      </v-container>
  </div>
</template>

<script>

export default {
  name: 'Home',
}
</script>
