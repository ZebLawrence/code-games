import torch
from diffusers import I2VGenXLPipeline
from diffusers.utils import export_to_video, load_image

pipeline = I2VGenXLPipeline.from_pretrained("ali-vilab/i2vgen-xl", torch_dtype=torch.float16, variant="fp16")
pipeline.enable_model_cpu_offload()

image_url = "EuroFarm_20240922_0139-0000.jpg"
image = load_image(image_url).convert("RGB")
# image = image.resize((576, 1024))

prompt = "Beautiful woman"
negative_prompt = "Distorted face"
generator = torch.manual_seed(1)

frames = pipeline(
    prompt=prompt,
    image=image,
    num_inference_steps=50,
    num_frames=24,
    negative_prompt=negative_prompt,
    guidance_scale=9.0,
    generator=generator,
    height=1024,
    width=576,
).frames[0]
export_to_video(frames, "generated_highres4.mp4", fps=12)