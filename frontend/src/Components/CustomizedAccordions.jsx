import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import CustomizedTables from "./CustomizedTables";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function CustomizedAccordions(props) {
  const { faqData } = props;
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Rates</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <CustomizedTables courseData ={faqData}/>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Hours</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>


            <p><b>Apr. 14 - Apr. 16:</b> 9:45 a.m. to 8:30 p.m.</p>
            <p><b>Apr 17 - Apr. 23:</b> 8:45 a.m to 9:15 p.m.</p>
            <p><b>Apr 24 - May 14:</b> 7:45 a.m. 9:45 p.m.</p>
            <p><b>May 15 - May 21:</b>  6:45 a.m. 10:15 p.m.</p>
            <p><b>May 22 - Aug. 13:</b> 5:45 a.m. 11:00 p.m.</p>
            <p><b>Aug. 14 - Aug. 20:</b> 6:15 a.m. 9:30 p.m.</p>
            <p><b>Aug. 21 - Sep. 3:</b> 6:30 a.m. 9:30 p.m.</p>
            <p><b>Sep. 4 - Sep. 10:</b> 6:55 a.m. 9:30 p.m.</p>
            <p><b>Sep. 11 - Sep. 24:</b> 7:00 a.m. 8:30 p.m.</p>
            <p><b>Sep. 25 - Oct. 1:</b> 7:20 a.m. 8:30 p.m.</p>
            <p><b>Oct. 2 - Oct. 22</b> 7:50 a.m. 8:30 p.m.</p>
            <p><b>Oct. 23 - Oct. 29:</b> 8:15 a.m. 8:30 p.m.</p>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Course Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            9 Holes - par 32, 2,169 yards 18 Holes - par 68, 5181 yards
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
