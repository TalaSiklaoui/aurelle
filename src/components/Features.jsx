import "./Features.css";

const icons = {
  diamond: (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--gold)"
      strokeWidth="1.5"
    >
      <path d="M6 3h12l4 6-10 12L2 9z" />
      <path d="M2 9h20M9 3l-3 6 6 12 6-12-3-6" />
    </svg>
  ),

  heart: (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--gold)"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20s-7-4.5-9.5-9C.8 7.6 2.8 4 6.5 4c2.1 0 3.7 1.2 5.5 3.2C13.8 5.2 15.4 4 17.5 4c3.7 0 5.7 3.6 4 7-2.5 4.5-9.5 9-9.5 9z" />
    </svg>
  ),

  shield: (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--gold)"
      strokeWidth="1.2"
    >
      <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),

  box: (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--gold)"
      strokeWidth="1.2"
    >
      <path d="M21 8l-9-5-9 5 9 5 9-5z" />
      <path d="M3 8v8l9 5 9-5V8" />
      <path d="M12 13v8" />
    </svg>
  ),
};

const features = [
  {
    icon: "diamond",
    title: "Fine Quality",
    text: "We use the finest materials for lasting elegance.",
  },
  {
    icon: "heart",
    title: "Handcrafted",
    text: "Each piece is carefully handcrafted by artisans.",
  },
  {
    icon: "shield",
    title: "Lifetime Warranty",
    text: "We stand by our quality with lifetime care.",
  },
  {
    icon: "box",
    title: "Easy Returns",
    text: "14-day easy returns for your peace of mind.",
  },
];

export default function Features() {
  return (
    <section className="features-section">
      {features.map((feature) => (
        <div key={feature.title} className="feature-item">
          <div className="feature-icon">{icons[feature.icon]}</div>

          <h3>{feature.title}</h3>

          <p>{feature.text}</p>
        </div>
      ))}
    </section>
  );
}
