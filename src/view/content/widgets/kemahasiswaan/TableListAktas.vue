<template>
  <v-data-table
    :headers="headers"
    :items="listaktivitas"
    :search="search"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <template>
          <div class="example-tools justify-content-center">
            <b-form-input
              id="filter-input"
              v-model="search"
              type="search"
              placeholder="Nama Kegiatan"
            >
            </b-form-input>
          </div>
        </template>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="900px">
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
                <template>
                  <v-form>
                    <v-container>
                      <!-- <h4>
                        Detail Kegiatan
                      </h4> -->
                      <v-row>
                        <v-col cols="6" md="6">
                          <v-text-field
                            v-model="editedItem.name"
                            label="Nama"
                            required
                            :disabled="
                              editedItem.verifed_status === 'Sudah diverifikasi'
                            "
                          ></v-text-field>
                        </v-col>

                        <v-col cols="6" md="6">
                          <v-text-field
                            v-model="editedItem.mahasiswaNIM"
                            disabled
                            label="NIM"
                            required
                          ></v-text-field>
                        </v-col>

                        <!-- <v-col cols="12" md="4">
                          <v-text-field
                            v-model="email"
                            :rules="emailRules"
                            disabled
                            label="Prodi"
                            required
                          ></v-text-field>
                        </v-col> -->
                      </v-row>
                      <!-- <h4 class="mt-15">
                        Detail Validasi
                        <i
                          class="fas fa-info-circle text-warning icon-lg ml-1"
                        ></i>
                      </h4> -->
                      <v-row>
                        <v-col cols="12" md="6">
                          <v-select
                            v-model="editedItem.tingkatan"
                            label="Tingkat Kegiatan"
                            required
                            :items="items"
                            :disabled="
                              editedItem.verifed_status === 'Sudah diverifikasi'
                            "
                          ></v-select>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-text-field
                            v-model="editedItem.point_TAK"
                            label="TAK"
                            required
                            disabled
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12">
                          <template>
                            <div
                              class="d-flex flex-column justify-space-between align-center"
                            >
                              <v-img
                                :aspect-ratio="16 / 9"
                                :width="width"
                                :src="`${editedItem.image}`"
                              ></v-img>
                              <!-- <v-slider
                                v-model="width"
                                class="align-self-stretch"
                                min="600"
                                max="800"
                                step="1"
                              ></v-slider> -->
                            </div>
                          </template>
                        </v-col>
                        <!-- <v-col cols="12">
                          <v-textarea
                            outlined
                            name="input-7-4"
                            label="Outlined textarea"
                            value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
                          ></v-textarea>
                          <v-chip class="m-2" link pill
                            >Nama sertifikat tidak sesuai, mohon diinputkan
                            dengan benar</v-chip
                          >
                          <v-chip class="m-2" link pill
                            >bidang kegiatan dianggap tidak sesuai, mohon
                            diinputkan dengan benar</v-chip
                          >
                          <v-chip class="m-2" link pill
                            >jabatan yang dipilih tidak sesuai dengan keterangan
                            pada sertifikat, mohon diinputkan dengan
                            benar</v-chip
                          >
                        </v-col> -->
                      </v-row>
                    </v-container>
                  </v-form>
                </template>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">
                Cancel
              </v-btn>
              <v-btn
                v-if="editedItem.verifed_status === 'Belum diverifikasi'"
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        v-if="item.verifed_status === 'Belum diverifikasi'"
        color="amber"
        size="18"
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        v-if="item.verifed_status === 'Sudah diverifikasi'"
        color="blue"
        size="18"
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-eye
      </v-icon>
      <v-icon
        v-if="item.verifed_status === 'Belum diverifikasi'"
        color="red"
        size="18"
        class="mr-2"
        @click="deleteItem(item)"
      >
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
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),

    dialog: false,
    tanggal: false,
    width: 600,
    search: "",
    headers: [
      { text: "No", value: "no" },
      { text: "Nama Kegiatan", value: "name" },
      { text: "Point TAK", value: "point_TAK" },
      { text: "Tingkatan", value: "tingkatan" },
      { text: "Status", value: "verifed_status" },
      // { text: "Prodi", value: "prodi" },
      // { text: "Tanggal Input", value: "tgl" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    items: ["PROVINSI", "KOTA", "NASIONAL", "INTERNASIONAL"],
    listaktivitas: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      point_TAK: "",
      verifed_status: ""
      // kegiatan: "",
      // prodi: "",
      // tgl: "",
    },
    defaultItem: {
      name: "",
      point_TAK: "",
      verifed_status: ""
      // kegiatan: "",
      // prodi: "",
      // tgl: "",
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Detail Data Kegiatan";
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
    async initialize() {
      const response = await axios({
        method: "GET",
        url: `mahasiswa/${localStorage.getItem("nim")}`,
        headers: {
          Authorization: localStorage.getItem("token")
        }
      });

      this.listaktivitas = response.data.tak.map((data, index) => {
        return {
          no: index + 1,
          ...data,
          verifed_status:
            data.verifed_status === true
              ? "Sudah diverifikasi"
              : "Belum diverifikasi"
        };
      });
      console.log(this.listaktivitas);
    },

    editItem(item) {
      console.log(item);
      this.editedIndex = this.listaktivitas.indexOf(item);
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
      if (this.editedIndex > -1) {
        const response = await axios({
          method: "PATCH",
          url: `/tak/${this.editedItem.id}`,
          data: {
            name: this.editedItem.name,
            tingkatan: this.editedItem.tingkatan
          },
          headers: {
            Authorization: localStorage.getItem("token")
          }
        });
        if (response) {
          this.close();
          successAlert(response.data.message);
          this.initialize();
        }
      } else {
        // this.listaktivitas.push(this.editedItem);
      }
      this.close();
    },

    deleteItem(item) {
      Swal.fire({
        title: "Hapus Data TAK",
        text: "Apakah anda yakin ingin menghapus data TAK ini?",
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
              url: `/tak/${item.id}`,
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
