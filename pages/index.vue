<template>
  <div id="app">
    <v-app id="inspire">
      <form>
        <v-text-field
          v-model="name"
          label="Name"
          required
        >
        </v-text-field>
        <v-text-field
          v-model="nachname"
          label="Nachname"
          required
  
        ></v-text-field>
        <v-text-field
          v-model="sprintnummer"
          label="Sprintnummer"
          required
          
        ></v-text-field>
        <v-text-field
          v-model="stunden"
          label="Stunden"
          required
          
        ></v-text-field>
        <v-textarea
          v-model="bemerkung"
          filled
          auto-grow
          label="Bemerkung"
          rows="5"
          shaped
        ></v-textarea>
        <v-btn
          class="mr-4"
          @click="submit"
        >
          speichern
        </v-btn>
      </form>
<p>

</p>
    <v-simple-table light>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              Name
            </th>
            <th class="text-left">
              Nachname
            </th>
            <th class="text-left">
              Sprintnummer
            </th>
            <th class="text-left">
              Stunden
            </th>
            <th class="text-left">
              Bemerkung
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in items"
            :key="item.name"
          >
            <td>{{ item.name }}</td>
            <td>{{ item.nachname }}</td>
            <td>{{ item.sprintnummer }}</td>
            <td>{{ item.stunden }}</td>
            <td>{{ item.bemerkung }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-app>
</div>
</template>

<script>
export default {
  data: function(){
    return {name:"",nachname:"",sprintnummer:"",stunden:"",bemerkung:"", items:[]};
  },
  created: function(){
    return this.load();
  },
  methods: {
    
    async submit() {
      await fetch("http://localhost:3001/api/personalInfo",{
        method: "POST", 
        body: JSON.stringify({ 
          name: this.name,
          nachname: this.nachname,
          sprintnummer: this.sprintnummer,
          stunden: this.stunden,
          bemerkung: this.bemerkung
        })
      });
      await this.load();
  
    },
    async load() {
      this.items = await fetch("http://localhost:3001/api/personalInfo").then((response) => response.json());

    }
  }
}
</script>
<style>
</style>
