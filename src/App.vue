<template>
  <v-app>

  <v-app-bar 
    clipped-left 
    app>
    
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title>Visiting Banyumas</v-toolbar-title>      
  </v-app-bar>

  <v-navigation-drawer 
    v-model="drawer"
    clipped
    fixed
    app>
     <v-list
        dense
        nav>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          router-link-active
          :to="item.link"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="item-title">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

  </v-navigation-drawer>

  
  <!-- Sizes your content based upon application components -->
  <v-main>
    <!-- Provides the application the proper gutter -->
    <v-container fluid>
      <!-- If using vue-router -->
      <router-view></router-view>
    </v-container>
  </v-main>

  <v-footer app>
    <!-- -->
  </v-footer>

  </v-app>
</template>



<script>
  export default {
     data () {
      return {
        items: [
          { title: 'Dashboard', icon: 'mdi-view-dashboard' , link:"/"},
          { title: 'Accomodation Hotel', icon: 'mdi-bed', link:"/hotel" }, 
          { title: 'Tourist Desination', icon: 'mdi-map-marker-radius', link:"/destination" },
          { title: 'Tourism Village', icon: 'mdi-home', link:"/desa" },
          { title: 'Art', icon: 'mdi-artstation', link:"/art" },
          { title: 'Culture', icon: 'mdi-chess-king', link:"/culture" },
          { title: 'Culinary', icon: 'mdi-food', link:"/culinary" },
        ],
        drawer: null
      }
    },
  }
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.item-title{
  text-align: left;
}


#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
