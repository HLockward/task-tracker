import { auth } from "@/auth";

export default auth((req) => {
  if (!req.auth) {
    const url = req.url.replace(req.nextUrl.pathname, "/api/auth/signin");
    return Response.redirect(url);
  }
});

export const config = {
  matcher: ["/tasks/new", "/tasks/:id/edit"],
};
