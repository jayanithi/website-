import React, { useMemo, useState } from "react";
import {
  AppBar, Avatar, Badge, Box, Button, Card, CardContent, Chip, Container,
  Dialog, DialogActions, DialogContent, DialogTitle, Divider, Drawer,
  FormControl, Grid, IconButton, InputAdornment, MenuItem, Paper, Select,
  Stack, TextField, Toolbar, Typography, Snackbar, Alert, Tabs, Tab
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import BusinessCenterRoundedIcon from "@mui/icons-material/BusinessCenterRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";

const jobs = [
  { id: 1, title: "Senior Product Designer", company: "Linear Labs", location: "Remote · India", type: "Full-time", salary: "₹18–24 LPA", posted: "2 days ago", category: "Design", color: "#625BFF", initials: "LL", featured: true, tags: ["Figma", "Product design", "Design systems"], description: "Shape intuitive product experiences, partner with engineering, and help build a cohesive design system." },
  { id: 2, title: "Frontend Developer", company: "Nexora Technologies", location: "Bengaluru, India", type: "Full-time", salary: "₹12–18 LPA", posted: "1 day ago", category: "Engineering", color: "#0EA5A4", initials: "N", featured: true, tags: ["React", "JavaScript", "Material UI"], description: "Build accessible, performant web applications with a collaborative product engineering team." },
  { id: 3, title: "Data Analyst", company: "BrightMetrics", location: "Chennai, India", type: "Hybrid", salary: "₹7–10 LPA", posted: "3 days ago", category: "Data", color: "#F59E0B", initials: "B", featured: false, tags: ["SQL", "Python", "Power BI"], description: "Turn complex datasets into clear insights and dashboards that support business decisions." },
  { id: 4, title: "Backend Engineer", company: "CloudPeak", location: "Remote · India", type: "Full-time", salary: "₹15–22 LPA", posted: "5 days ago", category: "Engineering", color: "#2563EB", initials: "C", featured: false, tags: ["Python", "Node.js", "APIs"], description: "Design reliable APIs and scalable services for products used by thousands of customers." },
  { id: 5, title: "Marketing Associate", company: "Goodfolk Studio", location: "Coimbatore, India", type: "Full-time", salary: "₹4–6 LPA", posted: "Today", category: "Marketing", color: "#EC4899", initials: "G", featured: false, tags: ["SEO", "Content", "Analytics"], description: "Create campaigns, learn from performance data, and grow an emerging consumer brand." },
  { id: 6, title: "UX Research Intern", company: "Orbit Works", location: "Remote", type: "Internship", salary: "₹20–30K / month", posted: "4 days ago", category: "Design", color: "#8B5CF6", initials: "O", featured: false, tags: ["Research", "Interviews", "Usability"], description: "Support user interviews, usability studies, and research synthesis across product teams." }
];

const categories = ["All jobs", "Engineering", "Design", "Data", "Marketing"];

function JobCard({ job, saved, onSave, onApply }) {
  return (
    <Card className="job-card" variant="outlined">
      <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
        <Stack direction="row" alignItems="flex-start" spacing={1.5}>
          <Avatar variant="rounded" sx={{ bgcolor: job.color, width: 48, height: 48, fontWeight: 800 }}>{job.initials}</Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography fontWeight={800} sx={{ lineHeight: 1.35 }}>{job.title}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: .4 }}>{job.company}</Typography>
          </Box>
          <IconButton aria-label="Save job" onClick={() => onSave(job.id)} size="small" color={saved ? "primary" : "default"}>
            {saved ? <BookmarkRoundedIcon /> : <BookmarkBorderRoundedIcon />}
          </IconButton>
        </Stack>
        <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mt: 2 }}>
          <Chip size="small" icon={<LocationOnOutlinedIcon />} label={job.location} variant="outlined" />
          <Chip size="small" icon={<WorkOutlineRoundedIcon />} label={job.type} variant="outlined" />
        </Stack>
        <Stack direction="row" flexWrap="wrap" gap={.7} sx={{ mt: 1.5 }}>
          {job.tags.map(tag => <Chip key={tag} label={tag} size="small" sx={{ bgcolor: "#F1F2FF", color: "#5550C9", fontWeight: 600 }} />)}
        </Stack>
        <Divider sx={{ my: 2 }} />
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
          <Box>
            <Typography fontWeight={800} color="primary.main">{job.salary}</Typography>
            <Typography variant="caption" color="text.secondary">{job.posted}</Typography>
          </Box>
          <Button variant="contained" endIcon={<ArrowForwardRoundedIcon />} onClick={() => onApply(job)}>Apply now</Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All jobs");
  const [type, setType] = useState("All types");
  const [saved, setSaved] = useState([]);
  const [view, setView] = useState("jobs");
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicationOpen, setApplicationOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", resume: "", cover: "" });
  const [toast, setToast] = useState("");
  const [mobileNav, setMobileNav] = useState(false);
  const [tab, setTab] = useState(0);

  const filteredJobs = useMemo(() => jobs.filter(job => {
    const matchesQuery = `${job.title} ${job.company} ${job.location} ${job.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === "All jobs" || job.category === category;
    const matchesType = type === "All types" || job.type === type;
    const matchesSaved = view !== "saved" || saved.includes(job.id);
    return matchesQuery && matchesCategory && matchesType && matchesSaved;
  }), [query, category, type, saved, view]);

  const toggleSave = id => setSaved(current => current.includes(id) ? current.filter(x => x !== id) : [...current, id]);
  const openApply = job => { setSelectedJob(job); setApplicationOpen(true); };
  const submitApplication = () => {
    if (!form.name.trim() || !form.email.trim()) { setToast("Please enter your name and email."); return; }
    setApplicationOpen(false);
    setToast("Demo application submitted successfully!");
    setForm({ name: "", email: "", phone: "", resume: "", cover: "" });
  };

  const navItems = [
    { key: "jobs", label: "Find jobs", icon: <DashboardRoundedIcon /> },
    { key: "saved", label: "Saved jobs", icon: <BookmarkBorderRoundedIcon />, count: saved.length },
    { key: "applications", label: "My applications", icon: <BusinessCenterRoundedIcon /> },
    { key: "profile", label: "My profile", icon: <PersonOutlineRoundedIcon /> }
  ];

  const changeView = key => { setView(key); setMobileNav(false); };
  const sidebar = (
    <Box className="sidebar-inner">
      <Stack direction="row" alignItems="center" spacing={1.2} sx={{ px: 2.5, py: 3 }}>
        <Box className="brand-mark"><WorkOutlineRoundedIcon /></Box>
        <Typography variant="h6" fontWeight={900} letterSpacing="-.6px">careerly</Typography>
      </Stack>
      <Typography className="nav-caption">WORKSPACE</Typography>
      <Stack spacing={.5} sx={{ px: 1.5, mt: 1 }}>
        {navItems.map(item => (
          <Button key={item.key} className={`nav-link ${view === item.key ? "active" : ""}`} fullWidth startIcon={item.icon} onClick={() => changeView(item.key)} endIcon={item.count ? <Chip label={item.count} size="small" /> : null}>
            {item.label}
          </Button>
        ))}
      </Stack>
      <Box className="sidebar-help">
        <AutoAwesomeRoundedIcon sx={{ color: "#635BFF", mb: 1 }} />
        <Typography fontWeight={800}>Career tip</Typography>
        <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: .7, lineHeight: 1.6 }}>A tailored profile can help recruiters discover your skills faster.</Typography>
        <Button size="small" sx={{ mt: 1.2, px: 0 }} onClick={() => changeView("profile")}>Complete profile <ArrowForwardRoundedIcon sx={{ fontSize: 16, ml: .5 }} /></Button>
      </Box>
      <Box sx={{ mt: "auto", px: 2.5, py: 2 }}>
        <Stack direction="row" spacing={1.2} alignItems="center">
          <Avatar sx={{ bgcolor: "#DCE4FF", color: "#5148E5" }}>JD</Avatar>
          <Box><Typography fontWeight={700} variant="body2">Jordan Davis</Typography><Typography variant="caption" color="text.secondary">Job seeker</Typography></Box>
        </Stack>
      </Box>
    </Box>
  );

  return (
    <Box className="app-shell">
      <Box component="aside" className="desktop-sidebar">{sidebar}</Box>
      <Drawer open={mobileNav} onClose={() => setMobileNav(false)}>{sidebar}</Drawer>
      <Box component="main" className="main-area">
        <AppBar position="sticky" elevation={0} color="inherit" className="topbar">
          <Toolbar sx={{ minHeight: "72px !important", px: { xs: 2, md: 4 } }}>
            <IconButton onClick={() => setMobileNav(true)} sx={{ display: { md: "none" }, mr: 1 }}><DashboardRoundedIcon /></IconButton>
            <Typography fontWeight={700} color="text.secondary" sx={{ display: { xs: "none", sm: "block" } }}>Your career starts here</Typography>
            <Box sx={{ flex: 1 }} />
            <IconButton><Badge variant="dot" color="error"><NotificationsNoneRoundedIcon /></Badge></IconButton>
            <Avatar sx={{ ml: 1.5, width: 36, height: 36, bgcolor: "#DCE4FF", color: "#5148E5", fontSize: 14 }}>JD</Avatar>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" className="page-content">
          {view === "jobs" || view === "saved" ? (
            <>
              <Box className="hero-panel">
                <Box sx={{ position: "relative", zIndex: 1, maxWidth: 620 }}>
                  <Chip label="YOUR NEXT CHAPTER" size="small" sx={{ bgcolor: "rgba(255,255,255,.16)", color: "white", mb: 2, fontWeight: 700, letterSpacing: 1 }} />
                  <Typography variant="h3" className="hero-title">{view === "saved" ? "Your saved opportunities." : "Find work that works for you."}</Typography>
                  <Typography sx={{ color: "rgba(255,255,255,.78)", mt: 1.5, maxWidth: 500 }}>Discover roles that match your skills, goals, and the way you want to work.</Typography>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={1} className="hero-search">
                    <TextField fullWidth placeholder="Job title, skill, or company" value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === "Enter" && setTab(0)} InputProps={{ startAdornment: <InputAdornment position="start"><SearchRoundedIcon /></InputAdornment> }} />
                    <Button variant="contained" color="secondary" onClick={() => setTab(0)}>Search jobs</Button>
                  </Stack>
                </Box>
                <Box className="hero-decoration"><Box /><Box /><Box /></Box>
              </Box>

              <Grid container spacing={2} sx={{ mt: 1, mb: 3 }}>
                <Grid item xs={12} sm={4}><Paper className="stat-card"><Box className="stat-icon purple"><WorkOutlineRoundedIcon /></Box><Box><Typography variant="h5" fontWeight={900}>2,450+</Typography><Typography variant="caption" color="text.secondary">Open opportunities</Typography></Box></Paper></Grid>
                <Grid item xs={12} sm={4}><Paper className="stat-card"><Box className="stat-icon teal"><BusinessCenterRoundedIcon /></Box><Box><Typography variant="h5" fontWeight={900}>850+</Typography><Typography variant="caption" color="text.secondary">Hiring companies</Typography></Box></Paper></Grid>
                <Grid item xs={12} sm={4}><Paper className="stat-card"><Box className="stat-icon orange"><TrendingUpRoundedIcon /></Box><Box><Typography variant="h5" fontWeight={900}>92%</Typography><Typography variant="caption" color="text.secondary">Candidate satisfaction</Typography></Box></Paper></Grid>
              </Grid>

              <Stack direction={{ xs: "column", md: "row" }} alignItems={{ md: "center" }} justifyContent="space-between" spacing={2} sx={{ mb: 2 }}>
                <Box><Typography variant="h5" fontWeight={900}>{view === "saved" ? "Saved jobs" : "Explore opportunities"}</Typography><Typography color="text.secondary" variant="body2" sx={{ mt: .5 }}>{filteredJobs.length} roles matching your preferences</Typography></Box>
                <Stack direction="row" spacing={1} alignItems="center">
                  <FormControl size="small" sx={{ minWidth: 145 }}><Select value={type} onChange={e => setType(e.target.value)} displayEmpty>{["All types", "Full-time", "Hybrid", "Internship"].map(x => <MenuItem key={x} value={x}>{x}</MenuItem>)}</Select></FormControl>
                  <Button variant="outlined" startIcon={<TuneRoundedIcon />} onClick={() => { setQuery(""); setCategory("All jobs"); setType("All types"); }}>Reset</Button>
                </Stack>
              </Stack>

              <Tabs value={tab} onChange={(e, v) => { setTab(v); setCategory(categories[v]); }} variant="scrollable" scrollButtons="auto" sx={{ mb: 2, "& .MuiTab-root": { fontWeight: 700, minWidth: 90 } }}>
                {categories.map(c => <Tab key={c} label={c} />)}
              </Tabs>
              {filteredJobs.length ? <Grid container spacing={2.2}>{filteredJobs.map(job => <Grid item xs={12} md={6} xl={4} key={job.id}><JobCard job={job} saved={saved.includes(job.id)} onSave={toggleSave} onApply={openApply} /></Grid>)}</Grid> :
                <Paper className="empty-state"><SearchRoundedIcon sx={{ fontSize: 42, color: "#9AA3B2" }} /><Typography variant="h6" fontWeight={800} sx={{ mt: 1 }}>No jobs found</Typography><Typography color="text.secondary">Try changing your search or filters.</Typography><Button sx={{ mt: 2 }} onClick={() => { setQuery(""); setCategory("All jobs"); setType("All types"); }}>Clear filters</Button></Paper>}
            </>
          ) : view === "applications" ? (
            <Paper className="content-panel"><Typography variant="h5" fontWeight={900}>My applications</Typography><Typography color="text.secondary" sx={{ mt: .5 }}>Track the roles you have applied for.</Typography><Box className="empty-state"><BusinessCenterRoundedIcon sx={{ fontSize: 42, color: "#9AA3B2" }} /><Typography fontWeight={800} sx={{ mt: 1 }}>No applications yet</Typography><Typography color="text.secondary" variant="body2">When you apply for a role, it will appear here.</Typography><Button variant="contained" sx={{ mt: 2 }} onClick={() => changeView("jobs")}>Browse jobs</Button></Box></Paper>
          ) : (
            <Paper className="content-panel"><Typography variant="h5" fontWeight={900}>My profile</Typography><Typography color="text.secondary" sx={{ mt: .5 }}>Manage the details recruiters use to learn about you.</Typography><Stack direction="row" spacing={2} alignItems="center" sx={{ my: 3 }}><Avatar sx={{ width: 64, height: 64, bgcolor: "#DCE4FF", color: "#5148E5", fontSize: 22 }}>JD</Avatar><Box><Typography fontWeight={800}>Jordan Davis</Typography><Typography color="text.secondary" variant="body2">Frontend Developer · Coimbatore, India</Typography></Box></Stack><Grid container spacing={2}><Grid item xs={12} md={6}><TextField fullWidth label="Full name" defaultValue="Jordan Davis" /></Grid><Grid item xs={12} md={6}><TextField fullWidth label="Email" defaultValue="jordan@example.com" /></Grid><Grid item xs={12} md={6}><TextField fullWidth label="Current role" defaultValue="Frontend Developer" /></Grid><Grid item xs={12} md={6}><TextField fullWidth label="Location" defaultValue="Coimbatore, India" /></Grid></Grid><Button variant="contained" sx={{ mt: 3 }} onClick={() => setToast("Profile saved in this demo session.")}>Save profile</Button></Paper>
          )}
          <Typography variant="caption" color="text.secondary" display="block" textAlign="center" sx={{ py: 4 }}>© 2026 Careerly. Your next opportunity is closer than you think.</Typography>
        </Container>
      </Box>

      <Dialog open={applicationOpen} onClose={() => setApplicationOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ pr: 6 }}>Apply for {selectedJob?.title}<IconButton onClick={() => setApplicationOpen(false)} sx={{ position: "absolute", right: 12, top: 12 }}><CloseRoundedIcon /></IconButton></DialogTitle>
        <DialogContent dividers>
          <Typography color="text.secondary" variant="body2" sx={{ mb: 2 }}>Applying to {selectedJob?.company}. This demo stores no data on a server.</Typography>
          <Stack spacing={2}>
            <TextField required label="Full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            <TextField required type="email" label="Email address" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            <TextField label="Phone number" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
            <TextField label="Resume link" placeholder="https://..." value={form.resume} onChange={e => setForm({ ...form, resume: e.target.value })} />
            <TextField multiline minRows={3} label="Cover note (optional)" value={form.cover} onChange={e => setForm({ ...form, cover: e.target.value })} />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}><Button onClick={() => setApplicationOpen(false)} color="inherit">Cancel</Button><Button variant="contained" onClick={submitApplication}>Submit application</Button></DialogActions>
      </Dialog>
      <Snackbar open={!!toast} autoHideDuration={3500} onClose={() => setToast("")} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}><Alert severity="info" onClose={() => setToast("")}>{toast}</Alert></Snackbar>
    </Box>
  );
}