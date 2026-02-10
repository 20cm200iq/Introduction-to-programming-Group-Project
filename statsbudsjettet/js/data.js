// Statsbudsjettet 2025 - Real budget data from Prop. 1 S (2024-2025) "Gul bok"
// All amounts in milliarder kroner (mrd kr)
// Source: regjeringen.no/statsbudsjett/2025

const BUDGET_YEAR = 2025;
const POPULATION = 5_550_000; // Approximate Norwegian population 2025

const budgetData = {
    inntekter: {
        name: "Inntekter",
        description: "Statens samlede inntekter",
        total: 2250.0,
        children: [
            {
                name: "Skatter og avgifter",
                description: "Skatter og avgifter fra Fastlands-Norge",
                value: 1423.3,
                color: "#2d8a4e",
                children: [
                    { name: "Arbeidsgiveravgift og trygdeavgift", value: 466.7, description: "Avgifter betalt av arbeidsgivere og arbeidstakere til folketrygden" },
                    { name: "Skatt på formue og inntekt", value: 435.2, description: "Inntektsskatt og formuesskatt fra personer og selskaper" },
                    { name: "Merverdiavgift (MVA)", value: 409.3, description: "Avgift på omsetning av varer og tjenester" },
                    { name: "Andre avgifter", value: 54.2, description: "Øvrige særavgifter og gebyrer" },
                    { name: "Tobakk- og alkoholavgifter", value: 24.4, description: "Særavgifter på tobakksvarer og alkoholholdige drikkevarer" },
                    { name: "Motorvognavgifter", value: 18.8, description: "Engangsavgift, årsavgift og vektårsavgift på kjøretøy" },
                    { name: "Elavgift", value: 10.8, description: "Avgift på elektrisk kraft" },
                    { name: "Tollinntekter", value: 3.9, description: "Toll på importerte varer" }
                ]
            },
            {
                name: "Petroleumsinntekter",
                description: "Statens inntekter fra olje- og gassvirksomheten på norsk sokkel",
                value: 672.4,
                color: "#1a6b35",
                children: [
                    { name: "Skatt og avgift på utvinning", value: 280.0, description: "Særskatt og ordinær skatt på petroleumsvirksomhet" },
                    { name: "SDØE netto kontantstrøm", value: 252.4, description: "Statens direkte økonomiske engasjement i petroleumsvirksomheten" },
                    { name: "Utbytte fra Equinor", value: 140.0, description: "Statens utbytte som majoritetsaksjonær i Equinor ASA" }
                ]
            },
            {
                name: "Renter og utbytte",
                description: "Renteinntekter og aksjeutbytte fra statens plasseringer og eierskap",
                value: 87.5,
                color: "#3da362"
            },
            {
                name: "Andre inntekter",
                description: "Øvrige inntekter inkludert overføring fra Statens pensjonsfond Norge (11,7 mrd)",
                value: 62.2,
                color: "#5bb97d"
            },
            {
                name: "Statlig forretningsdrift",
                description: "Inntekter fra statlige forretningsvirksomheter",
                value: 4.6,
                color: "#7dcf98"
            }
        ]
    },
    utgifter: {
        name: "Utgifter",
        description: "Statens samlede utgifter",
        total: 2020.8,
        children: [
            {
                name: "Folketrygden",
                description: "Ytelser fra folketrygden – det norske velferdssystemets grunnpilar",
                value: 701.9,
                color: "#4361a5",
                children: [
                    { name: "Alderspensjon", value: 335.6, description: "Pensjon til alderspensjonister fra 62 år" },
                    { name: "Uføretrygd", value: 132.7, description: "Ytelse til personer med varig nedsatt arbeidsevne" },
                    { name: "Sykepenger", value: 71.3, description: "Kompensasjon for bortfall av arbeidsinntekt ved sykdom" },
                    { name: "Arbeidsavklaringspenger", value: 50.8, description: "Ytelse under avklaring av arbeidsevne etter sykdom eller skade" },
                    { name: "Helsetjenester", value: 46.2, description: "Refusjoner til lege, tannlege, fysioterapi og legemidler" },
                    { name: "Foreldrepenger", value: 29.5, description: "Ytelse til foreldre i forbindelse med fødsel og adopsjon" },
                    { name: "Andre sosiale formål", value: 20.5, description: "Grunn- og hjelpestønad, og diverse andre ytelser" },
                    { name: "Arbeidsmarkedstiltak", value: 15.4, description: "Dagpenger og tiltak for arbeidsledige" }
                ]
            },
            {
                name: "Kommuner og fylkeskommuner",
                description: "Rammetilskudd til kommuner og fylkeskommuner for lokale tjenester som skole, barnehage og eldreomsorg",
                value: 238.4,
                color: "#5a7ec2"
            },
            {
                name: "Sykehus",
                description: "Bevilgninger til de regionale helseforetakene og spesialisthelsetjenesten",
                value: 228.4,
                color: "#6b8fd0",
                children: [
                    { name: "Helse Sør-Øst RHF", value: 95.0, description: "Største helseregion – dekker Østlandet og Sørlandet" },
                    { name: "Helse Vest RHF", value: 45.0, description: "Dekker Vestland og Rogaland" },
                    { name: "Helse Midt-Norge RHF", value: 35.0, description: "Dekker Trøndelag og Møre og Romsdal" },
                    { name: "Helse Nord RHF", value: 28.4, description: "Dekker Nord-Norge" },
                    { name: "Fellesformål og investeringer", value: 25.0, description: "Felles IKT, utdanning, forskning og investeringer" }
                ]
            },
            {
                name: "Forsvar",
                description: "Forsvaret av Norge – økt med 15,5 mrd fra 2024 iht. ny langtidsplan",
                value: 110.0,
                color: "#7c9fdd"
            },
            {
                name: "Samferdsel",
                description: "Vei, jernbane, luftfart og kystforvaltning",
                value: 96.1,
                color: "#8dafea",
                children: [
                    { name: "Vegformål", value: 42.0, description: "Riksveger, fylkesveger og trafikksikkerhet" },
                    { name: "Jernbaneformål", value: 36.0, description: "Togdrift, infrastruktur og utbygging" },
                    { name: "Luftfart og kyst", value: 10.1, description: "Avinor, Kystverket og sjøtransport" },
                    { name: "Øvrig samferdsel", value: 8.0, description: "Post, elektronisk kommunikasjon mv." }
                ]
            },
            {
                name: "Utdanning og forskning",
                description: "Høyere utdanning, forskning og studiefinansiering",
                value: 61.4,
                color: "#5171b0"
            },
            {
                name: "Bistand og utenriks",
                description: "Internasjonal bistand og utenrikstjeneste",
                value: 48.7,
                color: "#6382be"
            },
            {
                name: "Politi og rettsvesen",
                description: "Politi, påtalemyndighet, domstoler og kriminalomsorg",
                value: 55.0,
                color: "#4a6da8"
            },
            {
                name: "Petroleumsvirksomhet",
                description: "Statens utgifter til petroleumssektoren, inkl. SDØE-investeringer",
                value: 29.6,
                color: "#8097c8"
            },
            {
                name: "Jordbruk og mat",
                description: "Overføringer etter jordbruksavtalen og matforvaltning",
                value: 28.8,
                color: "#9aadda"
            },
            {
                name: "Barnetrygd og familie",
                description: "Barnetrygd, kontantstøtte og familiepolitikk",
                value: 35.0,
                color: "#7089c0"
            },
            {
                name: "Kultur og frivillighet",
                description: "Kultur, idrett, medier og frivillig sektor",
                value: 25.0,
                color: "#8fa5d2"
            },
            {
                name: "Klima og miljø",
                description: "Klima- og miljøtiltak, naturforvaltning og forurensning",
                value: 15.0,
                color: "#a4b8e0"
            },
            {
                name: "Renter på statsgjeld",
                description: "Rentebetalinger på statens innenlandske og utenlandske gjeld",
                value: 16.4,
                color: "#b9cbee"
            },
            {
                name: "Andre statlige formål",
                description: "Statsforvaltning, digitalisering, næring, bolig, og øvrige formål",
                value: 332.0,
                color: "#748bb8",
                children: [
                    { name: "Næringsutvikling og fiskeri", value: 55.0, description: "Innovasjon Norge, næringsrettet forskning og fiskeriforvaltning" },
                    { name: "Bolig og husbanken", value: 40.0, description: "Bostøtte, startlån og boligpolitiske tiltak" },
                    { name: "Arbeid og velferd (admin)", value: 35.0, description: "NAV-administrasjon og arbeidsmarkedstiltak utover folketrygd" },
                    { name: "Statsforvaltning og IKT", value: 30.0, description: "Digitalisering, forvaltning og fellesløsninger" },
                    { name: "Annen helse og omsorg", value: 30.0, description: "Helsedirektorat, folkehelse, rusomsorg mv." },
                    { name: "Innvandring og integrering", value: 25.0, description: "UDI, mottak, bosetting og integreringstiltak" },
                    { name: "Barnehager og grunnskole (statlig)", value: 22.0, description: "Statlige tilskudd utover kommunale rammeoverføringer" },
                    { name: "Energi utenom petroleum", value: 15.0, description: "Enova, energiomstilling og nettutbygging" },
                    { name: "Øvrige formål", value: 80.0, description: "Diverse tilskudd, reserver og statlige virksomheter" }
                ]
            }
        ]
    },
    metadata: {
        source: "Prop. 1 S (2024–2025) Statsbudsjettet / Gul bok",
        year: 2025,
        currency: "NOK",
        unit: "milliarder kroner",
        url: "https://www.regjeringen.no/no/statsbudsjett/2025/",
        note: "Beløp er ekskl. lånetransaksjoner. Petroleumsinntekter/utgifter er inkludert i totalene. Noen underposter er estimater basert på departementenes budsjettprop."
    }
};

// Key figures for the summary bar
const keyFigures = {
    totalInntekter: 2250.0,
    totalUtgifter: 2020.8,
    overskudd: 229.2, // 2250.0 - 2020.8
    petroleumInntekter: 672.4,
    petroleumUtgifter: 29.6,
    oljekorrigertUnderskudd: -413.6,
    struktureltUnderskudd: -460.1,
    overforingFraOljefondet: 413.6,
    brukAvFondsmidler: 460.1
};
