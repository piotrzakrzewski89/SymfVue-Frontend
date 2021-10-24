<template #modal-footer="{ ok, cancel }">
  <b-modal id="modal-1" title="Dodawanie książki">
    <div class="col">
      <b-card
        title="Podaj dane książki"
        header-tag="header"
        footer-tag="footer"
      >
        {{ bookId }}
        <b-form>
          <h6 slot="header" class="mb-0"></h6>
          <b-card-text>
            <b-row class="my-1">
              <b-col sm="2">
                <label for="input-small">ISBN:</label>
              </b-col>
              <b-col sm="10">
                <b-form-input
                  id="name"
                  type="number"
                  v-model="isbn"
                  @input="$v.isbn.$model = $event.trim()"
                  :state="!$v.isbn.$dirty ? null : !$v.isbn.$error"
                  placeholder="Wpisz numer ISBN"
                />
                <b-form-invalid-feedback>
                  <p v-if="!$v.isbn.required">To pole jest wymagane!</p>
                  <p v-if="!$v.isbn.minLength">Pole ISBN jest zbyt krótkie!</p>
                </b-form-invalid-feedback>
                <b-form-valid-feedback>
                  Wszystko jest okej !
                </b-form-valid-feedback>
              </b-col>
            </b-row>

            <b-row class="my-1">
              <b-col sm="2">
                <label for="input-small">Tytuł:</label>
              </b-col>
              <b-col sm="10">
                <b-form-input
                  type="text"
                  v-model="title"
                  @input="$v.title.$model = $event.trim()"
                  :state="!$v.title.$dirty ? null : !$v.title.$error"
                  placeholder="Wpisz tytuł pozycji"
                />
                <b-form-invalid-feedback>
                  <p v-if="!$v.title.required">To pole jest wymagane!</p>
                  <p v-if="!$v.title.minLength">Tytuł jest zbyt krótki!</p>
                </b-form-invalid-feedback>
                <b-form-valid-feedback>
                  Wszystko jest okej !
                </b-form-valid-feedback>
              </b-col>
            </b-row>

            <b-row class="my-1">
              <b-col sm="2">
                <label for="input-small">Opis:</label>
              </b-col>
              <b-col sm="10">
                <b-form-textarea
                  id="textarea"
                  rows="3"
                  max-rows="6"
                  v-model="description"
                  @input="$v.description.$model = $event.trim()"
                  :state="
                    !$v.description.$dirty ? null : !$v.description.$error
                  "
                  placeholder="Wpisz opis pozycji"
                />
                <b-form-invalid-feedback>
                  <p v-if="!$v.description.required">To pole jest wymagane!</p>
                  <p v-if="!$v.description.minLength">Opis jest zbyt krótki!</p>
                </b-form-invalid-feedback>
                <b-form-valid-feedback>
                  Wszystko jest okej !
                </b-form-valid-feedback>
              </b-col>
            </b-row>
          </b-card-text>

          <div slot="footer">
            <b-button variant="primary" :disabled="$v.$invalid" @click="add"
              >Dodaj pozycje</b-button
            >
          </div>
        </b-form>
      </b-card>
    </div>
  </b-modal>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      file1: null,
      isbn: "",
      title: "",
      description: "",
    };
  },
  props: {
    bookId: {
      type: String,
    },
  },
  validations: {
    isbn: { required, minLength: minLength(5) },
    title: { required, minLength: minLength(5) },
    description: { required, minLength: minLength(5) },
  },
  computed: {
    canAdd() {
      return this.isbn.trim().lenght >= 3;
    },
  },
  methods: {
    add(event) {
      console.log(this.file1);
      event.preventDefault();
      this.$v.$touch();
      if (this.$v.$invalid) {
        alert("Blad !");
      } else {
        this.$emit("add", {
          ISBN: this.isbn,
          title: this.title,
          description: this.description,
          publicationDate: new Date(),
          user:
            "/symfvue/backend/public/users/" + localStorage.getItem("userId"),
        });
      }
    },
  },
};
</script>

<style></style>
