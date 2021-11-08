<template>
  <v-container fill-height mt-12>
    <v-layout justify-center>
      <v-flex xs12 sm6 md4>
        <v-card class="elevation-12 ma-24">
          <v-toolbar class="elevation-0">
            <v-toolbar-title>{{ texts.toolbar }}</v-toolbar-title>
            <v-spacer></v-spacer>

            <!-- <v-spacer></v-spacer> -->
            <v-switch
              align-center
              v-model="$vuetify.theme.dark"
              inset
              persistent-hint
              prepend-icon="mdi-weather-sunny"
              append-icon="mdi-weather-night"
            ></v-switch>
          </v-toolbar>

          <v-card-text>
            <v-form>
              <v-text-field
                outlined
                prepend-inner-icon="mdi-account"
                v-if="!isLogin"
                name="name"
                label="Nome"
                type="text"
                :error-messages="nameErrors"
                :success="!$v.user.name.$invalid"
                v-model.trim="$v.user.name.$model"
              ></v-text-field>

              <v-text-field
                prepend-inner-icon="mdi-email"
                outlined
                name="email"
                label="Email"
                type="email"
                :error-messages="emailErrors"
                :success="!$v.user.email.$invalid"
                v-model.trim="$v.user.email.$model"
              ></v-text-field>

              <v-text-field
                prepend-inner-icon="mdi-lock"
                icon
                outlined
                name="password"
                label="Senha"
                type="password"
                :error-messages="passwordErrors"
                :success="!$v.user.password.$invalid"
                v-model.trim="$v.user.password.$model"
              ></v-text-field>
            </v-form>

            <v-btn
              block
              depressed
              color="primary"
              :disabled="$v.$invalid || isLoading"
              @click="submit"
            >
              <template v-if="!isLoading">
                {{ texts.button }}
              </template>
              <template v-else>
                <v-progress-circular
                  indeterminate
                  color="white"
                  width="3"
                  size="25"
                ></v-progress-circular>
              </template>
            </v-btn>
          </v-card-text>

          <v-card-actions class="justify-center">
            <a @click="isLogin = !isLogin">
              {{ texts.link }}
            </a>
          </v-card-actions>

          <v-snackbar
            v-model="showSnackbar"
            timeout="60000"
            width="fit-content"
            min-width="300px"
            max-width="100%"
          >
            {{ error }}
            <template v-slot:action="{ attrs }">
              <v-btn
                color="pink"
                text
                v-bind="attrs"
                @click="showSnackbar = false"
              >
                Fechar
              </v-btn>
            </template>
          </v-snackbar>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators';
import AuthService from './../services/auth.service';
import { formatError } from '@/utils';

export default {
  name: 'Login',
  data: () => ({
    error: undefined,
    isLogin: true,
    isLoading: false,
    showSnackbar: false,
    user: {
      name: '',
      email: '',
      password: '',
    },
  }),
  validations() {
    const validations = {
      user: {
        email: {
          required,
          email,
        },
        password: {
          required,
          minLength: minLength(6),
        },
      },
    };

    if (this.isLogin) return validations;

    return {
      user: {
        ...validations.user,
        name: {
          required,
          minLength: minLength(3),
        },
      },
    };
  },
  computed: {
    texts() {
      console.log('Vuelidate: ', this.$v);
      console.log('Data: ', this.user);

      return this.isLogin
        ? {
            toolbar: 'Entrar',
            button: 'Entrar',
            link: 'Quero me cadastrar',
          }
        : {
            toolbar: 'Cadastrar',
            button: 'Criar conta',
            link: 'Já tenho uma conta',
          };
    },
    nameErrors() {
      const errors = [];
      console.log(this.$v);
      const name = this.$v.user.name;
      if (!name.$dirty) return errors;

      !name.required && errors.push('Nome obrigatório');
      !name.minLength &&
        errors.push(`Mínimo ${name.$params.minLength.min} caracteres`);

      return errors;
    },
    emailErrors() {
      const errors = [];
      const email = this.$v.user.email;
      if (!email.$dirty) return errors;

      !email.required && errors.push('Email obrigatório');
      !email.email && errors.push('Email inválido');

      return errors;
    },
    passwordErrors() {
      const errors = [];
      const password = this.$v.user.password;
      if (!password.$dirty) return errors;

      !password.required && errors.push('Senha obrigatória');
      !password.minLength &&
        errors.push(`Mínimo ${password.$params.minLength.min} caracteres`);

      return errors;
    },
  },
  methods: {
    log() {
      console.log('Vuelidate: ', this.$v);
    },
    async submit() {
      this.isLoading = true;
      try {
        this.isLogin
          ? await AuthService.login(this.user)
          : await AuthService.signup(this.user);

        this.$router.push(this.$route.query.redirect || '/dashboard');
      } catch (error) {
        console.log(error);
        this.error = formatError(error.message);
        this.showSnackbar = true;
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style lang="scss">
div.v-input.v-input--selection-controls.v-input--switch.v-input--switch--inset,
div.v-input.v-input--is-label-active.v-input--is-dirty.v-input--selection-controls.v-input--switch.v-input--switch--inset.primary--text {
  align-items: center;

  > div.v-input__control {
    height: 24px;

    div.v-input--selection-controls__input {
      margin-right: 0;
    }
  }
  div.v-input__append-outer {
    margin-left: 0;
  }
}

div.v-text-field__details {
  margin: 4px 0 4px;
}

.v-input__slot {
  margin-bottom: 0 !important;
}

div.v-text-field__slot > label.v-label {
  line-height: 24px;
}
</style>
