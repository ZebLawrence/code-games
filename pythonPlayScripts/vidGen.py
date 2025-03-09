import torch
from diffusers import StableVideoDiffusionPipeline
from diffusers.utils import load_image, export_to_video

pipeline = StableVideoDiffusionPipeline.from_pretrained("stabilityai/stable-video-diffusion-img2vid-xt", torch_dtype=torch.float16, variant="fp16")
pipeline.to("cuda")
pipeline.enable_model_cpu_offload()

image = load_image("EuroFarm_20240922_0139-0000.jpg")
image = image.resize((576, 1024))

generator = torch.manual_seed(42)
frames = pipeline(
  image,
  num_frames=24,
  width=576,
  height=1024,
  decode_chunk_size=8,
  generator=generator,
  motion_bucket_id=180,
  noise_aug_strength=0.1
).frames[0]
export_to_video(frames, "generated_basic.mp4", fps=12)