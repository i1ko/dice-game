import Container from "@mui/material/Container";
import DiceGame from '@/components/dice-game';

export default function Home() {
  return (
    <main>
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <DiceGame />
      </Container>
    </main>
  );
}
