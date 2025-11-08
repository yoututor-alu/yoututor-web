interface VideoSummaryCardProps {
  videoId: string;
  title: string;
  channel: string;
  publishedAt: string;
  summary: string;
  tags?: string[];
  className?: string;
}

const VideoSummaryCard = ({
  videoId,
  title,
  channel,
  publishedAt,
  summary,
  tags = [],
  className = ""
}: VideoSummaryCardProps) => {
  return (
    <section
      className={`bg-white rounded-3xl shadow-xl border border-gray/30 overflow-hidden ${className}`}
    >
      <div className="aspect-video bg-[#BDF0E6]">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full"
        />
      </div>

      <div className="p-8 space-y-4">
        <div>
          <h2 className="text-2xl font-semibold text-deepNavy mb-1">{title}</h2>
          <p className="text-gray text-sm">
            {channel} • {publishedAt}
          </p>
        </div>

        <p className="text-deepNavy/80 leading-relaxed">{summary}</p>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full bg-[#BDF0E6] text-deepNavy text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default VideoSummaryCard;
