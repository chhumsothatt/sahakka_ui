<template>
    <main class="body-login">
        <div class="login-container">
            <div class="row g-0 login-card">
                <div class="col-lg-6 col-md-12">
                    <div class="welcome-panel h-100 d-flex flex-column">
                        <div class="brand-logo">
                            Sahakka
                        </div>
                        <div class="mt-auto">
                            <h1 class="welcome-title">Welcome</h1>
                            <div class="trial-badge">
                                <i class="bi bi-gift-fill"></i>
                                Let's get started with Sahakka.
                            </div>
                            <ul class="feature-list">
                                <li>
                                    <i class="bi bi-shield-check"></i>
                                    We provide all the advantages
                                </li>
                                <li>
                                    <i class="bi bi-graph-up"></i>
                                    Simplify all your financial transactions
                                </li>
                                <li>
                                    <i class="bi bi-laptop"></i>
                                    Without any further requirements
                                </li>
                                <li>
                                    <i class="bi bi-clock-history"></i>
                                    24/7 dedicated support
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 col-md-12">
                    <div class="form-panel">
                        <div class="form-header">
                            <h2>Hey, Hello!</h2>
                            <p>Enter your credentials to access your account</p>
                        </div>
                        <form id="loginFormMain" @submit.prevent="handleLogin">
                            <!-- EMAIL -->
                            <div class="input-group-custom">
                                <label>
                                    <i class="bi bi-person-circle"></i>
                                    Email
                                </label>
                                <input v-model="email" type="text" class="form-control" placeholder="hello@example.com">
                                <p v-if="err.email" class="text-danger mt-1">
                                    {{ err.email }}
                                </p>
                            </div>
                            <!-- PASSWORD -->
                            <div class="input-group-custom">
                                <label>
                                    <i class="bi bi-key"></i>
                                    Password
                                </label>

                                <input v-model="password" type="password" class="form-control" placeholder="••••••••">

                                <p v-if="err.password" class="text-danger mt-1">
                                    {{ err.password }}
                                </p>
                            </div>
                            <div class="forgot-link">
                                <a href="#">Forgot Password?</a>
                            </div>
                            <!-- BUTTON -->
                            <button :disabled="isLoading" type="submit" class="btn btn-login">
                                <span v-if="isLoading" class="spinner-border spinner-border-sm me-2"></span>

                                {{ isLoading ? "Signing In..." : "Login" }}

                                <i v-if="!isLoading" class="bi bi-arrow-right-short"></i>
                            </button>
                        </form>
                        <!-- DIVIDER -->
                        <div class="divider">OR</div>
                        <!-- SIGNUP -->
                        <div class="signup-prompt">
                            Don't have an account?
                            <router-link to="/register" href="#">Sign Up</router-link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </main>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";


import { useAuthStore } from "@/stores/auth";
import { notify } from "@/utils/toast";

import {
    require,
    isEmail,
    validates
} from "@/utils/validate";

const email = ref("");
const password = ref("");


const isLoading = ref(false);

const auth = useAuthStore();
const router = useRouter();

const toast = notify(router);

const err = reactive({
    email: "",
    password: ""
});

function validate() {

    err.email = validates(email.value, [
        (v) => require(v, "Email is required"),
        (v) => isEmail(v, "Wrong email format")
    ]);

    err.password = require(
        password.value,
        "Password is required"
    );

    return !err.email && !err.password;
}

async function handleLogin() {
    console.log(email.value);
    console.log(password.value);
    
    
    if (!validate()) return;
    isLoading.value = true;
    try {
        await auth.login(
            email.value,
            password.value
        );
        router.push({
            name: "workspace-entry"
        });

    } catch (error) {
        toast.error(error.message);
    } finally {
        isLoading.value = false;
    }
}
</script>

<style scoped>
.body-login {
    background: linear-gradient(135deg, #f5f7fc 0%, #eef2f8 100%);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
}

/* main card container */
.login-container {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
}

/* modern glassmorphic card */
.login-card {
    background: #ffffff;
    border-radius: 2rem;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    transition: all 0.2s ease;
    border: 1px solid rgba(255, 255, 255, 0.3);
}

.welcome-panel {
    background: linear-gradient(145deg, #0a2540 0%, #1f4a6e 100%);
    padding: 2.5rem 2rem;
    height: 100%;
    color: white;
    position: relative;
}

.brand-logo {
    font-size: 1.8rem;
    font-weight: 700;
    letter-spacing: -0.5px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(255, 255, 255, 0.12);
    padding: 0.5rem 1.2rem;
    border-radius: 2rem;
    backdrop-filter: blur(4px);
}

.welcome-title {
    font-size: 2.4rem;
    font-weight: 700;
    line-height: 1.2;
    margin-top: 2rem;
}

.trial-badge {
    background: rgba(255, 215, 0, 0.18);
    backdrop-filter: blur(4px);
    border-radius: 2rem;
    padding: 0.4rem 1.2rem;
    display: inline-block;
    font-size: 0.85rem;
    font-weight: 500;
    margin-top: 1rem;
    border: 1px solid rgba(255, 215, 0, 0.3);
}

.feature-list {
    margin-top: 2rem;
    list-style: none;
    padding-left: 0;
}

.feature-list li {
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.9rem;
    opacity: 0.9;
}

.feature-list li i {
    font-size: 1.2rem;
    background: rgba(255, 255, 255, 0.15);
    width: 32px;
    height: 32px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
}

/* right side - login form */
.form-panel {
    padding: 2.5rem 2rem;
    background: white;
}

.form-header h2 {
    font-size: 1.9rem;
    font-weight: 700;
    color: #0a2540;
    margin-bottom: 0.25rem;
}

.form-header p {
    color: #6c7e8f;
    font-size: 0.9rem;
}

.input-group-custom {
    margin-bottom: 1.5rem;
}

.input-group-custom label {
    font-size: 0.85rem;
    font-weight: 600;
    color: #1f3b4c;
    margin-bottom: 0.5rem;
    display: block;
}

.input-group-custom .form-control {
    border-radius: 1rem;
    border: 1px solid #e2e8f0;
    padding: 0.8rem 1rem;
    font-size: 0.95rem;
    transition: all 0.2s;
    background: #fefefe;
}

.input-group-custom .form-control:focus {
    border-color: #1f4a6e;
    box-shadow: 0 0 0 4px rgba(31, 74, 110, 0.1);
}

.forgot-link {
    text-align: right;
    margin-top: -0.5rem;
    margin-bottom: 1.5rem;
}

.forgot-link a {
    font-size: 0.8rem;
    color: #1f4a6e;
    text-decoration: none;
    font-weight: 500;
}

.forgot-link a:hover {
    text-decoration: underline;
}

.btn-login {
    background: #0a2540;
    border: none;
    padding: 0.85rem;
    font-weight: 600;
    border-radius: 1.5rem;
    width: 100%;
    font-size: 1rem;
    transition: all 0.2s;
    color: white;
}

.btn-login:hover {
    background: #143e5c;
    transform: translateY(-1px);
    box-shadow: 0 8px 20px rgba(10, 37, 64, 0.2);
}

.divider {
    display: flex;
    align-items: center;
    text-align: center;
    margin: 1.5rem 0;
    color: #94a3b8;
    font-size: 0.8rem;
}

.divider::before,
.divider::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #e2e8f0;
}

.divider::before {
    margin-right: 1rem;
}

.divider::after {
    margin-left: 1rem;
}

.btn-social {
    border-radius: 1rem;
    padding: 0.7rem;
    font-weight: 500;
    font-size: 0.9rem;
    border: 1px solid #e2e8f0;
    background: white;
    transition: all 0.2s;
    color: #1e293b;
}

.btn-social:hover {
    background: #f8fafc;
    border-color: #cbd5e1;
}

.btn-social i {
    margin-right: 0.5rem;
    font-size: 1.1rem;
}

.signup-prompt {
    text-align: center;
    margin-top: 1.8rem;
    font-size: 0.9rem;
    color: #475569;
}

.signup-prompt a {
    color: #1f4a6e;
    font-weight: 700;
    text-decoration: none;
}

.signup-prompt a:hover {
    text-decoration: underline;
}


@media (max-width: 768px) {
    .welcome-panel {
        border-radius: 2rem 2rem 0 0;
    }

    .login-card {
        border-radius: 1.5rem;
    }

    .form-panel {
        padding: 2rem 1.5rem;
    }

    .welcome-title {
        font-size: 1.8rem;
    }
}
</style>