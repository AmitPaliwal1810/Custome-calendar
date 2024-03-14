import { Button, Card, Stack, TextField, Typography } from "@mui/material";
import { FC, useCallback, useState } from "react";
import bg from "../assets/images/bg.png";
import { useNavigate } from "react-router-dom";

export const Home: FC = () => {
  const navigation = useNavigate();
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = useCallback(
    (e: any) => {
      e.preventDefault();
      navigation("/calendar");
    },
    [navigation]
  );

  const handleSignup = useCallback(
    (e: any) => {
      e.preventDefault();
      navigation("/calendar");
    },
    [navigation]
  );

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{
        height: "100vh",
        width: "100%",
        background: `url(${bg})  no-repeat `,
        backgroundSize: "cover",
      }}
    >
      <Card
        elevation={2}
        sx={{
          padding: 4,
          background: "rgba(0,0,0,0.1)",
        }}
      >
        <Stack
          component={"form"}
          alignItems="center"
          spacing={2}
          minWidth={400}
          onSubmit={isLogin ? handleLogin : handleSignup}
        >
          <Typography variant="h4">{isLogin ? "Login" : "Signup"}</Typography>
          {!isLogin && (
            <TextField
              fullWidth
              label="User Name"
              variant="filled"
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <TextField
            fullWidth
            label="Email"
            variant="filled"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="filled"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" type="submit">
            {isLogin ? "Login" : "Signup"}
          </Button>
        </Stack>
        <Stack alignItems={"flex-end"}>
          <Button variant="text" onClick={() => setIsLogin((prev) => !prev)}>
            {!isLogin ? "Login" : "Signup"}
          </Button>
        </Stack>
      </Card>
    </Stack>
  );
};
