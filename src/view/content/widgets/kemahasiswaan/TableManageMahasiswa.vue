<template>
  <v-data-table
    :headers="headers"
    :items="daftarmahasiswa"
    :search="search"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Manage Mahasiswa</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="350px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              New Mahasiswa
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
              <v-spacer></v-spacer>
              <v-btn text @click="close">
                <v-icon small color="blue darken-1">
                  mdi-close
                </v-icon>
              </v-btn>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.nim"
                      label="NIM"
                      :disabled="editedIndex !== -1"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.name"
                      label="Nama"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.email"
                      label="Email"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      type="number"
                      v-model="editedItem.angkatan"
                      label="Angkatan"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-select
                      :items="jkSelect"
                      item-text="state"
                      item-value="abbr"
                      label="Jenis Kelamin"
                      v-model="editedItem.jenis_kelamin"
                    ></v-select>
                  </v-col>
                  <v-col cols="12">
                    <v-select
                      :items="prodiSelect"
                      item-text="state"
                      item-value="abbr"
                      label="Program Studi"
                      v-model="editedItem.prodi"
                    ></v-select>
                  </v-col>
                  <v-col cols="12">
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      :return-value.sync="editedItem.tanggal_lahir"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="editedItem.tanggal"
                          label="Tanggal Lahir"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="editedItem.tanggal"
                        no-title
                        scrollable
                      >
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu = false">
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.menu.save(editedItem.tanggal)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.password"
                      :disabled="editedIndex !== -1 ? !status : false"
                      label="Password"
                    ></v-text-field>
                  </v-col>
                  <!-- <v-switch
                    v-if="editedIndex !== -1"
                    v-model="status"
                    :label="`Edit password`"
                  ></v-switch> -->
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="save">
                Simpan
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <template v-slot:[`item.status`]="{ item }">
      <v-chip :color="getColor(item.status)" small dark>{{
        item.status
      }}</v-chip>
    </template>

    <template v-slot:[`item.actions`]="{ item }">
      <router-link
        :to="`/detailaktas/${item.nim}`"
        v-slot="{ navigate }"
        custom
      >
        <v-icon color="blue" size="18" class="mr-2" @click="navigate(item)">
          mdi-eye
        </v-icon>
      </router-link>
      <!-- <v-icon color="amber" size="18" class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon> -->
      <v-icon color="red" size="18" class="mr-2" @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>

    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>
<script>
import axios from "@/core/api";
import { successAlert, errorAlert, Swal } from "@/core/plugins/my-swal";

export default {
  data: () => ({
    dialog: false,
    menu: false,
    tanggal: false,
    status: false,
    search: "",
    headers: [
      { text: "No", value: "no" },
      { text: "NIM", value: "nim" },
      { text: "Name", value: "name" },
      { text: "Email", value: "email" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    jkSelect: [
      { state: "Pria", abbr: "PRIA" },
      { state: "Wanita", abbr: "WANITA" }
    ],
    prodiSelect: [
      { state: "Sistem Informasi", abbr: "SI" },
      { state: "Sistem Informasi Akuntansi", abbr: "SIA" },
      { state: "Informatika", abbr: "IF" }
    ],
    daftarmahasiswa: [],
    editedIndex: -1,
    editedItem: {
      nim: "",
      name: "",
      password: "",
      email: "",
      jenis_kelamin: "",
      prodi: "",
      tanggal_lahir: "",
      angkatan: ""
    },
    defaultItem: {
      name: "",
      nim: "",
      password: "",
      email: "",
      jenis_kelamin: "",
      prodi: "",
      tanggal_lahir: "",
      angkatan: ""
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Tambah Mahasiswa" : "Edit Mahasiswa";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    getColor(status) {
      if (status == "aktif") return "green";
      else return "red";
    },

    async initialize() {
      const mahasiswaPayload = await axios({
        method: "get",
        url: "/mahasiswa",
        headers: {
          Authorization: localStorage.getItem("token")
        }
      });

      this.daftarmahasiswa = mahasiswaPayload.data.map((item, index) => {
        return {
          no: index + 1,
          nim: item.nim,
          name: item.name,
          email: item.email
        };
      });
    },

    editItem(item) {
      this.editedIndex = this.daftarmahasiswa.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async save() {
      if (
        !this.editItem.nim ||
        !this.editItem.name ||
        !this.editedItem.email ||
        !this.editedItem.password ||
        !this.editedItem.angkatan ||
        !this.editedItem.prodi ||
        !this.editedItem.jenis_kelamin ||
        !this.editedItem.tanggal_lahir
      ) {
        return errorAlert(
          "Tidak boleh ada data yang kosong, harus diisi semua!"
        );
      }
      try {
        let response;
        if (this.editedIndex > -1) {
          // Edit Mahasiswa
          // response = await axios({
          //   method: "patch",
          //   url: `/mahasiswa/${this.editedItem.nim}`,
          //   data: {
          //     name: this.editedItem.name,
          //     email: this.editedItem.email,
          //   },
          // });
        } else {
          // Add Mahasiswa
          response = await axios({
            method: "post",
            url: "/mahasiswa/register",
            data: {
              nim: Number(this.editedItem.nim),
              name: this.editedItem.name,
              email: this.editedItem.email,
              password: this.editedItem.password,
              angkatan: Number(this.editedItem.angkatan),
              prodi: this.editedItem.prodi,
              gender: this.editedItem.jenis_kelamin,
              birthDate: this.editedItem.tanggal_lahir
            },
            headers: {
              Authorization: localStorage.getItem("token")
            }
          });
        }
        if (response) {
          this.close();
          successAlert(response.data.message);
          this.initialize();
        }
      } catch (err) {
        errorAlert(err.response.data.message);
      }
    },

    deleteItem(item) {
      Swal.fire({
        title: "Hapus Mahasiswa",
        text: "Apakah anda yakin ingin menghapus mahasiswa ini?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya",
        cancelButtonText: "Tidak",
        heightAuto: false
      }).then(async result => {
        if (result.value) {
          try {
            const response = await axios({
              method: "delete",
              url: `/mahasiswa/${item.nim}`,
              headers: {
                Authorization: localStorage.getItem("token")
              }
            });
            if (response) {
              successAlert(response.data.message);
              this.initialize();
            }
          } catch (err) {
            errorAlert(err.response.data.message);
          }
        }
      });
    }
  }
};
</script>
