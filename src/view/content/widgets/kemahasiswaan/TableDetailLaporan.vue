<template>
  <v-data-table
    :headers="headers"
    :items="takData"
    :search="search"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>
<script>
export default {
  props: {
    takData: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    dialogDelete: false,
    search: "",
    headers: [
      { text: "No", value: "id" },
      { text: "Nama Kegiatan", value: "name" },
      { text: "Poin TAK:", value: "point_TAK" },
      { text: "Tingkatan:", value: "tingkatan" },
      { text: "Status:", value: "verifed_status" }
    ],
    detailkegiatan: [],
    editedIndex: -1,
    editedItem: {
      no: "",
      kegiatan: "",
      poin: null
    },
    defaultItem: {
      no: "",
      kegiatan: "",
      poin: null
    }
  }),

  computed: {},

  created() {
    // this.initialize();
  },

  methods: {
    initialize() {
      this.detailkegiatan = [
        {
          no: "1",
          kegiatan: "Sertifikasi MOS",
          poin: 20
        },
        {
          no: "1",
          kegiatan: "Sertifikasi MOS",
          poin: 20
        },
        {
          no: "1",
          kegiatan: "Sertifikasi MOS",
          poin: 20
        },
        {
          no: "1",
          kegiatan: "Sertifikasi MOS",
          poin: 20
        }
      ];
    }
  }
};
</script>
