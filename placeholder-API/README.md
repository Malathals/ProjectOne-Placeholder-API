# Placeholder API
This is a simple API that processes and serves images with optional resizing capabilities.

## Usage

The API provides functionality for retrieving and resizing images.

### Retrieve an Image
Use the following endpoint to retrieve an image by name.

**Endpoint**: `/img/api/images`

**Method**: `GET`

**Query Parameters**:
- `imgName` (required): The name of the image (without extension).
- `width` (optional): The width to resize the image to.
- `height` (optional): The height to resize the image to.

**Example Request**:
```bash
GET http://localhost:3000/img/api/images?imgName=fjord&width=200&height=300
