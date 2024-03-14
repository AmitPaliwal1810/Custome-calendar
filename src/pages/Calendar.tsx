import {
  Button,
  Card,
  CardActionArea,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";

export const Calendar = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [month, setMonth] = useState<any>(new Date().getMonth() + 1);
  const [calendarArray, setCalendarArray] = useState<any>();
  const [dialog, setDialog] = useState({
    open: false,
    date: "",
  });
  const today = new Date();
  const currentYear = today.getFullYear();

  const createCalendarArray = useCallback((year: number, month: number) => {
    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
    const calendarArray = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarArray.push("");
    }

    for (let i = 1; i <= daysInMonth; i++) {
      calendarArray.push(new Date(year, month - 1, i));
    }

    const lastDayOfMonth = new Date(year, month, 0).getDay();
    const remainingSlots = 35 - (calendarArray.length + lastDayOfMonth);

    for (let i = 0; i < remainingSlots; i++) {
      calendarArray.push("");
    }

    return calendarArray;
  }, []);

  useEffect(() => {
    setCalendarArray(createCalendarArray(currentYear, month));
  }, [createCalendarArray, currentYear, month]);

  const handleSubmitEvent = useCallback(
    (e: any) => {
      e.preventDefault();
      console.log({ title, desc });
    },
    [desc, title]
  );

  const getMonthName = useMemo(() => {
    const monthIndex = month - 1;
    return `${new Date(currentYear, monthIndex).toLocaleString("en-us", {
      month: "long",
    })} ${currentYear} `;
  }, [currentYear, month]);

  return (
    <>
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{
          width: "100%",
          background: "#FFFDCB",
          height: "100vh",
        }}
      >
        <Stack
          sx={{
            minHeight: 100,
            width: "100%",
            padding: 4,
          }}
          alignItems={"center"}
        >
          <Typography variant="h6" fontWeight={"bold"}>
            Month {getMonthName}
          </Typography>
          <Stack direction={"row"}>
            <IconButton
              size="small"
              onClick={() => setMonth((prev: any) => prev - 1)}
              disabled={month === 1}
            >
              <ArrowCircleLeftRoundedIcon
                sx={{
                  fontSize: "40px",
                }}
              />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => setMonth((prev: any) => prev + 1)}
              disabled={month === 12}
            >
              <ArrowCircleRightRoundedIcon
                sx={{
                  fontSize: "40px",
                }}
              />
            </IconButton>
          </Stack>
        </Stack>
        <Stack
          justifyContent="center"
          alignItems="center"
          height={"100%"}
          width={"80%"}
          spacing={2}
        >
          <Grid container gap={2}>
            {[
              "Sunday",
              "Monday",
              "Tuesday",
              "WednesDay",
              "Thrusday",
              "Friday",
              "Saturday",
            ]?.map((x, index) => (
              <Grid key={index} item xs={1.5}>
                <Typography variant="h6" textAlign="center" fontWeight="bold">
                  {x}
                </Typography>
              </Grid>
            ))}
          </Grid>
          <Grid container gap={2} justifyItems={"center"}>
            {calendarArray?.map((x: any, index: number) => (
              <Grid key={index} item xs={1.5}>
                <CardActionArea
                  sx={{
                    height: "100%",
                    width: "100%",
                  }}
                  onClick={() =>
                    x &&
                    setDialog({
                      open: true,
                      date: x,
                    })
                  }
                >
                  <Card
                    elevation={4}
                    sx={{
                      padding: 1,
                      minHeight: 100,
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      background: index % 7 === 0 ? "#FFE4C9" : "#F3EDC8",
                    }}
                  >
                    {x ? new Date(x).getDate() : ""}
                  </Card>
                </CardActionArea>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Stack>
      <Dialog
        open={dialog.open}
        onClose={() => {
          setDialog((prev) => ({ ...prev, open: false }));
          setTitle("");
          setDesc("");
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
          }}
        >
          {new Date(dialog.date).toString().slice(0, 16)}
        </DialogTitle>
        <DialogContent
          sx={{
            width: 500,
            height: 300,
          }}
        >
          <Stack
            component={"form"}
            spacing={2}
            onSubmit={handleSubmitEvent}
            justifyContent={"center"}
            alignItems={"center"}
            sx={{
              height: "100%",
              width: "100%",
            }}
          >
            <TextField
              fullWidth
              label="Event Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              fullWidth
              label="Event Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};
