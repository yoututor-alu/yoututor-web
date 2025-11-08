import { MessageCircle, Sparkles, Zap } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    desc: "Get instant summaries and insights from any video in seconds"
  },
  {
    icon: Sparkles,
    title: "Smart AI",
    desc: "Powered by advanced AI to understand and answer your questions"
  },
  {
    icon: MessageCircle,
    title: "Natural Conversations",
    desc: "Chat naturally as if you're talking to a tutor who watched the video"
  }
];

const FeatureSection = () => (
  <section id="features" className="w-full max-w-6xl mx-auto">
    <h2 className="text-4xl md:text-5xl font-bold text-deepNavy text-center mb-16">
      Features
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {features.map((feature, i) => {
        const Icon = feature.icon;
        return (
          <div
            key={i}
            className="rounded-2xl p-8 border border-gray/40 bg-white hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center"
          >
            <div
              className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-5 shadow-md"
              style={{ backgroundColor: "#FED6D6" }}
            >
              <Icon className="w-7 h-7" style={{ color: "#151936" }} />
            </div>

            <h3 className="text-xl font-bold text-deepNavy mb-3">
              {feature.title}
            </h3>
            <p className="text-gray leading-relaxed">{feature.desc}</p>
          </div>
        );
      })}
    </div>
  </section>
);

export default FeatureSection;
