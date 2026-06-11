import React from "react";
import { Document, Page, Text, Image, View, StyleSheet, Font, Svg, Path, Circle, Link, Ellipse } from "@react-pdf/renderer";

Font.register({
  family: "Libre Baskerville",
  fonts: [
    { src: "https://fonts.gstatic.com/s/librebaskerville/v24/kmKUZrc3Hgbbcjq75U4uslyuy4kn0olVQ-LglH6T17uj8Q4SCQ.ttf", fontWeight: 400, fontStyle: "normal" },
    { src: "https://fonts.gstatic.com/s/librebaskerville/v24/kmKUZrc3Hgbbcjq75U4uslyuy4kn0olVQ-LglH6T17ujFgkSCQ.ttf", fontWeight: 700, fontStyle: "normal" },
    { src: "https://fonts.gstatic.com/s/librebaskerville/v24/kmKUZrc3Hgbbcjq75U4uslyuy4kn0olVQ-LglH6T17uj8Q4SCQ.ttf", fontWeight: 500, fontStyle: "normal" },
    { src: "https://fonts.gstatic.com/s/librebaskerville/v24/kmKUZrc3Hgbbcjq75U4uslyuy4kn0olVQ-LglH6T17uj8Q4SCQ.ttf", fontWeight: 600, fontStyle: "normal" },
    { src: "https://fonts.gstatic.com/s/librebaskerville/v24/kmKWZrc3Hgbbcjq75U4uslyuy4kn0qNccR04_RUJeby2OU36SgNK.ttf", fontWeight: 400, fontStyle: "italic" }
  ]
});

Font.register({
  family: "Inter",
  fonts: [
    { src: "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hjQ.ttf", fontWeight: 400 },
    { src: "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuI6fAZ9hjQ.ttf", fontWeight: 500 },
    { src: "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYAZ9hjQ.ttf", fontWeight: 600 }
  ]
});

const styles = StyleSheet.create({
  page: { padding: 40, backgroundColor: "#fdfbf8", fontFamily: "Libre Baskerville", color: "#451a03", border: "12pt solid #451a03" },
  innerBorder: { margin: 10, border: "1pt solid #451a03", flex: 1, padding: 30, display: "flex", flexDirection: "column", alignItems: "center", position: "relative" },
  titleSmall: { fontSize: 16, fontStyle: "italic", textAlign: "center", marginBottom: 20, opacity: 0.8 },
  titleLarge: { fontSize: 36, textAlign: "center", textTransform: "uppercase", marginBottom: 15, tracking: 4 },
  subtitle: { fontSize: 14, fontStyle: "italic", textAlign: "center", marginBottom: 5, opacity: 0.8 },
  titleEngagement: { fontSize: 36, textAlign: "center", textTransform: "uppercase", tracking: 5, marginBottom: 20 },
  dateBox: { textAlign: "center", marginBottom: 15 },
  dateTitle: { fontSize: 24, textAlign: "center", marginBottom: 5, tracking: 2, textTransform: "uppercase" },
  venueName: { fontFamily: "Inter", fontSize: 13, textAlign: "center", tracking: 2, textTransform: "uppercase", fontWeight: 600, opacity: 0.9, marginBottom: 5 },
  venueLocation: { fontSize: 9, textAlign: "center", textTransform: "uppercase", opacity: 0.8 },
  linkBox: { display: "flex", flexDirection: "row", justifyContent: "center", gap: 15, marginBottom: 15 },
  linkAnchor: { fontSize: 10, fontFamily: "Inter", fontWeight: 500, color: "#854d0e", textDecoration: "none", borderBottom: "1pt solid #854d0e", paddingBottom: 2 },
  sectionHeader: { fontFamily: "Inter", fontSize: 10, tracking: 2, textTransform: "uppercase", fontWeight: 600, opacity: 0.7, marginBottom: 15, marginTop: 10, textAlign: "center" },
  dressCodeTitle: { fontSize: 22, fontStyle: "italic", textAlign: "center", marginBottom: 20, opacity: 0.9 },
  eventRow: { display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 8, width: "100%", justifyContent: "space-between" },
  eventTime: { fontSize: 12, opacity: 0.8, width: "40%", textAlign: "left" },
  eventNameBox: { display: "flex", flexDirection: "row", alignItems: "center", width: "60%", justifyContent: "flex-end" },
  eventNameText: { fontSize: 14, marginRight: 10, textAlign: "right" },
  eventIcon: { width: 14, height: 14 },
  page2Image: { width: "100%", height: 210, objectFit: "contain", position: "absolute", bottom: 10 },
  dressCodeImages: { display: "flex", flexDirection: "column", justifyContent: "center", gap: 20, marginBottom: 10, marginTop: 0, alignItems: "center", width: "100%" },
  dressCodeContainer: { width: "100%", height: 230, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", position: "relative" },
  dressCodeFloor: { position: "absolute", bottom: -5, width: "100%", height: 60 },
  quoteContainer: { position: "absolute", bottom: 30, left: 0, right: 0, alignItems: "center" },
  quote: { fontSize: 16, fontStyle: "italic", textAlign: "center", opacity: 0.8 }
});

const UtensilsIcon = () => (
  <Svg viewBox="0 0 24 24" style={styles.eventIcon}>
    <Path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" fill="none" stroke="#451a03" strokeWidth={1.5} />
  </Svg>
);

const GlassWaterIcon = () => (
  <Svg viewBox="0 0 24 24" style={styles.eventIcon}>
    <Path d="M15.2 22H8.8a2 2 0 0 1-2-1.79L5 3h14l-1.81 17.21A2 2 0 0 1 15.2 22ZM6 12h12" fill="none" stroke="#451a03" strokeWidth={1.5} />
  </Svg>
);

const HeartIcon = () => (
  <Svg viewBox="0 0 24 24" style={styles.eventIcon}>
    <Path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" fill="none" stroke="#451a03" strokeWidth={1.5} />
  </Svg>
);

const MusicIcon = () => (
  <Svg viewBox="0 0 24 24" style={styles.eventIcon}>
    <Path d="M9 18V5l12-2v13" fill="none" stroke="#451a03" strokeWidth={1.5} />
    <Circle cx="6" cy="18" r="3" fill="none" stroke="#451a03" strokeWidth={1.5} />
    <Circle cx="18" cy="16" r="3" fill="none" stroke="#451a03" strokeWidth={1.5} />
  </Svg>
);

const EventRow = ({ time, name, iconObj }: { time: string, name: string, iconObj: React.ReactNode }) => (
  <View style={styles.eventRow}>
    <Text style={styles.eventTime}>{time}</Text>
    <View style={styles.eventNameBox}>
      <Text style={styles.eventNameText}>{name}</Text>
      {iconObj}
    </View>
  </View>
);

export const InvitationPDF = ({ mensImg, womensImg }: { mensImg: string, womensImg: string }) => {
  return (
    <Document author="Pritha & Souparna" title="Engagement Invitation">
      <Page size="A4" style={styles.page}>
        <View style={styles.innerBorder}>
          <View style={{ flex: 1, display: "flex", justifyContent: "flex-start", width: "100%" }}>
            <Text style={styles.titleSmall}>Together with their families</Text>
            <Text style={styles.titleLarge}>Pritha</Text>
            <Text style={{ fontSize: 24, textAlign: "center", marginBottom: 15 }}>&</Text>
            <Text style={styles.titleLarge}>Souparna</Text>
            <Text style={styles.subtitle}>Joyfully invite you to their</Text>
            <Text style={styles.titleEngagement}>ENGAGEMENT</Text>

            <View style={styles.dateBox}>
              <Text style={styles.dateTitle}>NOV 1 & 2, 2026</Text>
              <Text style={styles.venueName}>Bombay Beach Resort</Text>
              <Text style={styles.venueLocation}>Mandarmani, West Bengal</Text>
            </View>
            
            <View style={styles.linkBox}>
              <Link style={styles.linkAnchor} src="https://maps.app.goo.gl/e8HxBLMhzH3o486K8">View Map Location</Link>
              <Link style={styles.linkAnchor} src="https://www.google.com/calendar/render?action=TEMPLATE&text=Pritha+%26+Souparna+Engagement&dates=20261101T063000Z/20261102T093000Z&details=Join+us+for+our+engagement+celebrations!&location=Bombay+Beach+Resort,+Mandarmani">Add to Calendar</Link>
            </View>

            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
              <View style={{ width: "45%" }}>
                <Text style={styles.sectionHeader}>Nov 1 (Day 1)</Text>
                <View style={{ paddingLeft: 0, paddingRight: 0 }}>
                  <EventRow time="12:00 PM" name="Lunch" iconObj={<UtensilsIcon />} />
                  <EventRow time="6:00 PM" name="Hi-tea" iconObj={<GlassWaterIcon />} />
                  <EventRow time="7:00 PM" name="Engagement" iconObj={<HeartIcon />} />
                  <EventRow time="8:00 PM" name="DJ Night" iconObj={<MusicIcon />} />
                </View>
              </View>

              <View style={{ width: "45%" }}>
                <Text style={styles.sectionHeader}>Nov 2 (Day 2)</Text>
                <View style={{ paddingLeft: 0, paddingRight: 0 }}>
                  <EventRow time="8:00 AM" name="Breakfast" iconObj={<UtensilsIcon />} />
                  <EventRow time="12:00 PM" name="Farewell Lunch" iconObj={<UtensilsIcon />} />
                </View>
              </View>
            </View>
          </View>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <View style={styles.innerBorder}>
          <View style={{ flex: 1, display: "flex", justifyContent: "center", width: "100%", alignItems: "center" }}>
            <Text style={styles.dressCodeTitle}>Dress code for the ceremony</Text>
            <View style={styles.dressCodeImages}>
              <View style={styles.dressCodeContainer}>
                <Svg viewBox="0 0 100 30" style={styles.dressCodeFloor}>
                  <Ellipse cx="50" cy="15" rx="60" ry="10" fill="#854d0e" fillOpacity={0.15} />
                </Svg>
                <Image src={womensImg} style={styles.page2Image} />
              </View>
              <View style={styles.dressCodeContainer}>
                <Svg viewBox="0 0 100 30" style={styles.dressCodeFloor}>
                  <Ellipse cx="50" cy="15" rx="60" ry="10" fill="#854d0e" fillOpacity={0.15} />
                </Svg>
                <Image src={mensImg} style={styles.page2Image} />
              </View>
            </View>
          </View>
          <View style={styles.quoteContainer}>
            <Text style={styles.quote}>"Where the sun sets... A Promise Is Made"</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};
