<template>
  <div class="row">
    <div class="col-12">
      <div class="card card-custom">
        <div class="card-body">
          <!--begin::Details-->
          <div class="d-flex">
            <!--begin: Pic-->
            <div class="flex-shrink-0 mr-7 mt-lg-0 mt-3">
              <!-- <div class="symbol symbol-50 symbol-lg-120">
                <img :src="currentUserPhoto" alt="image" />
              </div> -->

              <div class="symbol symbol-50 symbol-lg-120 symbol-primary d-none">
                <span class="font-size-h3 symbol-label font-weight-boldest"
                  >JM</span
                >
              </div>
            </div>
            <!--end::Pic-->

            <!--begin::Info-->
            <div class="flex-grow-1">
              <!--begin::Title-->
              <div class="d-flex justify-content-between flex-wrap mt-1 mb-2">
                <div class="d-flex mr-3">
                  <a
                    href="#"
                    class="text-dark-75 text-hover-primary font-size-h5 font-weight-bold mr-3"
                  >
                    {{ dataMahasiswa.name }}</a
                  >
                  <a href="#"
                    ><i class="flaticon2-correct text-success font-size-h5"></i
                  ></a>
                </div>
              </div>
              <!--end::Title-->

              <!--begin::Content-->
              <div class="d-flex flex-wrap justify-content-between mt-1 mb-8">
                <div class="d-flex flex-column flex-grow-1 pr-8">
                  <div class="d-flex flex-wrap mb-4">
                    <a
                      href="#"
                      class="text-dark-50 text-hover-primary font-weight-bold mr-lg-8 mr-5 mb-lg-0 mb-2"
                      ><i class="flaticon2-new-email mr-2 font-size-lg"></i
                      >{{ dataMahasiswa.email }}</a
                    >
                    <a
                      href="#"
                      class="text-dark-50 text-hover-primary font-weight-bold mr-lg-8 mr-5 mb-lg-0 mb-2"
                      ><i class="flaticon2-calendar-3 mr-2 font-size-lg"></i>
                      {{ dataMahasiswa.nim }}
                    </a>
                    <a
                      href="#"
                      class="text-dark-50 text-hover-primary font-weight-bold"
                      ><i class="flaticon2-placeholder mr-2 font-size-lg"></i>2
                      Maret 1984</a
                    >
                  </div>

                  <span class="font-weight-bold text-dark-50"
                    >Mahasiswa angkatan 2017 STMIK Primakara
                  </span>
                  <span class="font-weight-bold text-dark-50"
                    >Program Studi Teknik Informatika</span
                  >
                </div>

                <div
                  class="d-flex align-items-center w-25 flex-fill float-right mt-lg-12 mt-8"
                >
                  <span class="font-weight-bold text-dark-75">TAK</span>
                  <div class="progress progress-xs mx-3 w-100">
                    <div
                      class="progress-bar bg-success"
                      role="progressbar"
                      style="width: 63%;"
                      aria-valuenow="50"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <span class="font-weight-bolder text-dark">78%</span>
                </div>
              </div>
              <!--end::Content-->
            </div>
            <!--end::Info-->
          </div>
          <!--end::Details-->

          <div class="separator separator-solid"></div>
        </div>
      </div>
    </div>
    <div class="col-lg-12">
      <TableDetailLaporan
        :takData="getTakData"
        @reinit="getData"
      ></TableDetailLaporan>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import TableDetailLaporan from "@/view/content/widgets/kemahasiswaan/TableDetailLaporan.vue";
import axios from "@/core/api";

export default {
  name: "custom-page",
  components: {
    TableDetailLaporan
  },
  data() {
    return {
      tabIndex: 0,
      matkul: "",
      dataMahasiswa: {}
    };
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [{ title: "Dosen" }]);
  },
  methods: {
    /**
     * Set current active on click
     * @param event
     */
    setActiveTab(event) {
      let target = event.target;
      if (!event.target.classList.contains("navi-link")) {
        target = event.target.closest(".navi-link");
      }

      const tab = target.closest('[role="tablist"]');
      const links = tab.querySelectorAll(".navi-link");
      // remove active tab links
      for (let i = 0; i < links.length; i++) {
        links[i].classList.remove("active");
      }

      // set clicked tab index to bootstrap tab
      this.tabIndex = parseInt(target.getAttribute("data-tab"));

      // set current active tab
      target.classList.add("active");
    },
    async getData() {
      const response = await axios({
        method: "GET",
        url: `/mahasiswa/${this.$route.params.nim}`,
        headers: {
          Authorization: localStorage.getItem("token")
        }
      });
      console.log(response.data);
      this.dataMahasiswa = response.data;
    }
  },
  created() {
    this.getData();
  },
  computed: {
    ...mapGetters(["currentUserPersonalInfo"]),

    getTakData() {
      if (this.dataMahasiswa.tak) {
        return this.dataMahasiswa.tak.map((data, index) => {
          return {
            no: index + 1,
            ...data,
            verifed_status:
              data.verifed_status === true
                ? "Sudah diverifikasi"
                : "Belum diverifikasi"
          };
        });
      } else {
        return [];
      }
    },

    getFullName() {
      return (
        this.currentUserPersonalInfo.name +
        " " +
        this.currentUserPersonalInfo.surname
      );
    }
  }
};
</script>
