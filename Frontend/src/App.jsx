import AppRoutes from "./AppRoutes"
import "../src/style.scss"
import { AuthProvider } from "./features/post/auth.context";
import { PostContextProvider } from "./features/post/post.context";
import { FollowProvider } from "./features/post/follow.context";

const App = () => {
  return (
    <AuthProvider>
      <FollowProvider>
      <PostContextProvider>
      <AppRoutes/>
    </PostContextProvider>
    </FollowProvider>
    </AuthProvider>
  )
}

export default App