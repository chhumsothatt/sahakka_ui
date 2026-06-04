import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "landing",
      component: () => import("../views/LandingView.vue"),
    },
    {
      path: "/newpassword",
      name: "newpassword",
      component: () => import("../views/auth/newPassword.vue")
    },
    {
      path: "/otp",
      name: "otp",
      component: () => import("../views/auth/OtpView.vue")
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/auth/RegisterView.vue"),
    },
    {
      path: "/reset",
      name: "reset",
      component: () => import("../views/auth/ResetPassView.vue"),
    },
    {
      path: "/workspace",
      component: () => import("../layout/WorkspaceLayout.vue"),
      meta: { requiresAuth: true },
      redirect: { name: "workspace-entry" },
      children: [
        {
          path: "",
          name: "workspace-entry",
          meta: { requiresAuth: true },
        },
        {
          path: ":workspace_id/team/:team_id/tasks",
          name: "tasks",
          meta: { requiresAuth: true },
          component: () => import("../views/TasksView.vue"),
        },
        {
          path: ":workspace_id/teams",
          name: "team",
          meta: { requiresAuth: true },
        },
        {
          path: ":workspace_id/team/:team_id/issues",
          name: "issues",
          meta: { requiresAuth: true },
          component: () => import("../views/IssuesView.vue"),
        },
        {
          path: ":workspace_id/team/:team_id/document",
          name: "document",
          meta: { requiresAuth: true },
          component: () => import("../views/DocumentView.vue"),
        },
        {
          path: ":workspace_id/team/:team_id/activity",
          name: "activity",
          meta: { requiresAuth: true },
          component: () => import("../views/ActivityView.vue"),
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
  ],
});

router.beforeEach((to) => {
  const auth = useAuthStore();

  if (to.matched.some((route) => route.meta.requiresAuth) && !auth.isLoggedIn) {
    return { name: "login" };
  }

  // Keep /login available so users can submit email/password from landing.
});

export default router;
